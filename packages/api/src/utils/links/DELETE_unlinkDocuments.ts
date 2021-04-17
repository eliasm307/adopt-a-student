import { ObjectMap } from '../../../common/src';
import { FirestoreAdmin } from '../../declarations/interfaces';
import { DataUpdater } from '../../declarations/types';
import getDocumentData from '../firebase/getDocumentData';
import updateDocumentData from '../firebase/updateDocumentData';

/** Required props from each document for linking */
export interface DocumentUnlinkingProps<D, L> {
  collectionPath: string;
  dataPredicate: (data: any) => data is D;
  id: string;
  linkReducer: (link: L) => string;
  linkToRemovePredicate: (link: L) => boolean;
  linksPropName: keyof D;
}

interface Props<D1, D2, L1, L2> {
  document1Props: DocumentUnlinkingProps<D1, L1>;
  document2Props: DocumentUnlinkingProps<D2, L2>;
  firestore: FirestoreAdmin;
}

/** Util to create a document updater for the links property
 * when mutating a document */
const createDocumentPropDataUpdater = <D>(
  linksProp: keyof D
): DataUpdater<D> => {
  return ({ edits, existingData }) => ({
    ...existingData,
    [linksProp]: edits[linksProp]!, // overwrite existing links
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

export default async function DELETE_unlinkDocuments<D1, D2, L1, L2>(
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

  const documentsAlreadyUnlinked =
    !document1LinkIdMap[document2Props.id] &&
    !document2LinkIdMap[document1Props.id];

  // avoid any uneccessary writes if documents already linked
  if (documentsAlreadyUnlinked) {
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
  if (document1IsLinkedToDocument2) {
    // add link
    document1Links.push(document1Props.linkToAdd);

    const filteredLinks = document1Links.filter(
      document1Props.linkToRemovePredicate
    );

    // create document update promise
    const updatePromise = updateDocumentData({
      ...document1Props,
      firestore,
      edits: {
        ...document1Data,
        [document1Props.linksPropName]: filteredLinks,
      },
      dataUpdater: createDocumentPropDataUpdater(document1Props.linksPropName),
    });

    // replace queued promise with promise to mutate document with new link
    updatePromises[0] = updatePromise;
  }

  const document2IsLinkedToDocument1 = document2LinkIdMap[document1Props.id];

  // only add links if they didnt exist already
  if (document2IsLinkedToDocument1) {
    // add link
    document2Links.push(document2Props.linkToAdd);

    // create document update promise
    const updatePromise = updateDocumentData({
      ...document2Props,
      firestore,
      edits: document2Data,
      dataUpdater: createDocumentPropDataUpdater(document2Props.linksPropName),
    });

    // replace queued promise with promise to mutate document with new link
    updatePromises[1] = updatePromise;
  }

  return Promise.all(updatePromises);
}
