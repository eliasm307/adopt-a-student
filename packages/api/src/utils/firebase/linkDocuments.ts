import { ObjectMap } from "../../../common/src";
import { FirestoreAdmin } from "../../declarations/interfaces";
import { DataUpdater } from "../../declarations/types";
import getDocumentData from "./getDocumentData";
import updateDocumentData from "./updateDocumentData";

interface Props<D1, D2, L1, L2> {
  document1CollectionPath: string;
  document1DataPredicate: (data: any) => data is D1;
  document1Id: string;
  document1LinkCreater: (id: string) => L1;
  document1LinkReducer: (link: L1) => string;
  document1LinksProp: keyof D1;
  document2CollectionPath: string;
  document2DataPredicate: (data: any) => data is D2;
  document2Id: string;
  document2LinkCreater: (id: string) => L2;
  document2LinkReducer: (link: L2) => string;
  document2LinksProp: keyof D2;
  firestore: FirestoreAdmin;
}

const newDocumentLinkDataUpdater = <D>(linksProp: keyof D): DataUpdater<D> => {
  return ({ edits, existingData }) => ({
    ...existingData,
    [linksProp]: edits[linksProp]!, // overwrite existing links
  });
};
const newDocumentLinksReducer = <L>(linkReducer: (link: L) => string) => {
  return (
    acc: ObjectMap<string, boolean>,
    link: L
  ): ObjectMap<string, boolean> => {
    const id = linkReducer(link);
    return { ...acc, [id]: true };
  };
};

export default async function linkDocuments<D1, D2, L1, L2>(
  props: Props<D1, D2, L1, L2>
) {
  const {
    document1CollectionPath,
    document1DataPredicate,
    document1Id,
    document1LinksProp,
    document2CollectionPath,
    document2DataPredicate,
    document2Id,
    document1LinkReducer,
    document2LinkReducer,
    document2LinksProp,
    document1LinkCreater,
    document2LinkCreater,
    firestore,
  } = props;

  const document1CrudProps = {
    id: document1Id,
    collectionPath: document1CollectionPath,
    dataPredicate: document1DataPredicate,
    firestore,
  };
  const document2CrudProps = {
    id: document2Id,
    collectionPath: document2CollectionPath,
    dataPredicate: document2DataPredicate,
    firestore,
  };

  // Read current data in parallel
  const document1ReadPromise = getDocumentData({
    ...document1CrudProps,
  });

  const document2ReadPromise = getDocumentData({
    ...document2CrudProps,
  });

  const [document1, document2] = await Promise.all([
    document1ReadPromise,
    document2ReadPromise,
  ]);

  // get pointers to link arrays in documents
  const document1Links = document1[document1LinksProp];
  const document2Links = document2[document2LinksProp];

  if (!Array.isArray(document1Links) || !Array.isArray(document2Links))
    throw Error(
      "Could not link documents, one of the links prop values is not an array"
    );

  // reduce link array to object map
  const document1LinkIdMap = (document1Links as L1[]).reduce(
    newDocumentLinksReducer(document1LinkReducer),
    {} as ObjectMap<string, boolean>
  );
  const document2LinkIdMap = (document2Links as L2[]).reduce(
    newDocumentLinksReducer(document2LinkReducer),
    {} as ObjectMap<string, boolean>
  );

  const documentsAlreadyLinked =
    document1LinkIdMap[document2Id] && document2LinkIdMap[document1Id];

  // avoid any uneccessary writes if documents already linked
  if (documentsAlreadyLinked) return { message: "Users already linked" };

  // queue promises to return existing documents by default
  const updatePromises: [Promise<D1>, Promise<D2>] = [
    Promise.resolve(document1),
    Promise.resolve(document2),
  ];

  // todo make this less
  // only add links if they didnt exist already
  // mutate arrays directly, test this works
  if (!document1LinkIdMap[document2Id]) {
    // add link
    document1Links.push(document1LinkCreater(document2Id));

    // create document update promise
    const updatePromise = updateDocumentData({
      ...document1CrudProps,
      edits: document1,
      dataUpdater: newDocumentLinkDataUpdater(document1LinksProp),
    });

    // queue promise to mutate document
    updatePromises[0] = updatePromise;
  }

  if (!document2LinkIdMap[document1Id]) {
    // add link
    document2Links.push(document2LinkCreater(document1Id));

    // create document update promise
    const updatePromise = updateDocumentData({
      ...document2CrudProps,
      edits: document2,
      dataUpdater: newDocumentLinkDataUpdater(document2LinksProp),
    });

    // queue promise to mutate document
    updatePromises[1] = updatePromise;
  }

  // write changes back to firestore
  /*
  const document1UpdatePromise = updateDocumentData({
    ...document1CrudProps,
    edits: document1,
    dataUpdater: ({ edits, existingData }) => ({
      ...existingData,
      document2s: edits.document2s!,
    }),
  });

  const document2UpdatePromise = updateDocumentData({
    ...document2CrudProps,
    edits: document2,
    dataUpdater: ({ edits, existingData }) => ({
      ...existingData,
      document1s: edits.document1s!,
    }),
  });

  */

  return Promise.all(updatePromises);
}
