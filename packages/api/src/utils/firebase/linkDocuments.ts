import { ObjectMap } from "../../../common/src";
import { FirestoreAdmin } from "../../declarations/interfaces";
import { DataUpdater } from "../../declarations/types";
import getDocumentData from "./getDocumentData";
import updateDocumentData from "./updateDocumentData";

/** Required props from each document for linking */
export interface DocumentLinkingProps<D, L> {
  collectionPath: string;
  dataPredicate: (data: any) => data is D;
  id: string;
  linkReducer: (link: L) => string;
  linkToAdd: L;
  linksPropName: keyof D;
}

interface Props<D1, D2, L1, L2> {
  document1Props: DocumentLinkingProps<D1, L1>;
  document2Props: DocumentLinkingProps<D2, L2>;
  firestore: FirestoreAdmin;
}

/** Util to create a document updater for the links property
 * when mutating a document */
const createDocumentPropDataUpdater = <D>(
  linksProp: keyof D
): DataUpdater<D> => {
  return ({ edits, existingData }) => ({
    ...existingData,
    [linksProp]: edits[linksProp]!, // overwrite existing links only
  });
};

/** Util to reduce an array of links to an object map */
const createLinksReducer = <L>(linkReducer: (link: L) => string) => {
  return (
    acc: ObjectMap<string, boolean>,
    link: L
  ): ObjectMap<string, boolean> => {
    const id = linkReducer(link);
    return { ...acc, [id]: true };
  };
};

interface CreateAddLinkPromise<D, L> {
  currentData: D;
  currentLinks: L[];
  documentProps: DocumentLinkingProps<D, L>;
  firestore: FirestoreAdmin;
}
const createAddLinkPromise = async <D, L>({
  documentProps,
  firestore,
  currentData,
  currentLinks,
}: CreateAddLinkPromise<D, L>) => {
  const { linksPropName, linkToAdd } = documentProps;

  // create and return document update promise
  return updateDocumentData({
    ...documentProps,
    firestore,
    edits: {
      ...currentData,
      [linksPropName]: [...currentLinks, linkToAdd], // add link
    },
    dataUpdater: createDocumentPropDataUpdater(linksPropName),
  });
};

export default async function linkDocuments<D1, D2, L1, L2>(
  props: Props<D1, D2, L1, L2>
): Promise<[D1, D2]> {
  const { document1Props, document2Props, firestore } = props;

  // Read current data in parallel
  const [document1Data, document2Data] = await Promise.all([
    getDocumentData({ ...document1Props, firestoreAdmin: firestore }),
    getDocumentData({ ...document2Props, firestoreAdmin: firestore }),
  ]);

  // get pointers to link arrays in documents
  const document1Links = document1Data[document1Props.linksPropName];
  const document2Links = document2Data[document2Props.linksPropName];

  // assert document links are arrays
  if (!Array.isArray(document1Links) || !Array.isArray(document2Links))
    throw Error(
      "Could not link documents, one of the links prop values is not an array"
    );

  // reduce link array to object map
  const document1LinkIdMap = (document1Links as L1[]).reduce(
    createLinksReducer(document1Props.linkReducer),
    {}
  );
  const document2LinkIdMap = (document2Links as L2[]).reduce(
    createLinksReducer(document2Props.linkReducer),
    {}
  );

  const documentsLinksAlreadyExist =
    document1LinkIdMap[document2Props.id] &&
    document2LinkIdMap[document1Props.id];

  // avoid any uneccessary writes if documents already linked
  if (documentsLinksAlreadyExist) {
    console.warn(__filename, "Users already linked, doing nothing");
    return [document1Data, document2Data];
  }

  // queue promises to return existing documents by default
  const updatePromises: [Promise<D1>, Promise<D2>] = [
    Promise.resolve(document1Data),
    Promise.resolve(document2Data),
  ];

  // todo make this less repetitive

  // mutate arrays directly, // todo test this works

  const document1IsLinkedToDocument2 = document1LinkIdMap[document2Props.id];

  // only add links if they didnt exist already
  if (!document1IsLinkedToDocument2) {
    /*
    const { linksPropName, linkToAdd } = documentProps;

    // add link
    // document1Links.push(document1Props.linkToAdd);

    // create document update promise
    const updatePromise = updateDocumentData({
      ...document1Props,
      firestore,
      edits: {
        ...currentData,
        [linksPropName]: [...currentLinks, linkToAdd], // add link
      },
      dataUpdater: createDocumentPropDataUpdater(linksPropName),
    });
    */

    // replace queued promise with promise to mutate document with new link
    // updatePromises[0] = updatePromise;
    updatePromises[0] = createAddLinkPromise({
      currentData: document1Data,
      currentLinks: document1Links,
      documentProps: document1Props,
      firestore,
    });
  }

  const document2IsLinkedToDocument1 = document2LinkIdMap[document1Props.id];

  // only add links if they didnt exist already
  if (!document2IsLinkedToDocument1)
    updatePromises[1] = createAddLinkPromise({
      currentData: document2Data,
      currentLinks: document2Links,
      documentProps: document2Props,
      firestore,
    });

  return Promise.all(updatePromises);
}
