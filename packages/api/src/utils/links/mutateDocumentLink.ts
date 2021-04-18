import { ObjectMap } from '@adopt-a-student/common';

import { FirestoreAdmin } from '../../declarations/interfaces';
import getDocumentData from '../firebase/getDocumentData';
import { hasLinkMutator } from './interfaces';

/** Required props from each document for linking */
export interface DocumentLinkMutationProps<D, L> {
  collectionPath: string;
  dataPredicate: (data: any) => data is D;
  id: string;
  linkReducer: (link: L) => string;
  // linkToAdd: L;
  linksPropName: keyof D;
}

export interface LinkMutatorProps<D, L> {
  currentData: D;
  currentLinks: L[];
  documentProps: DocumentLinkMutationProps<D, L>;
  firestoreAdmin: FirestoreAdmin;
}

interface MutateDocumentLinkProps<D1, L1, D2, L2> {
  document1Props: DocumentLinkMutationProps<D1, L1> & hasLinkMutator<D1, L1>;
  document2Props: DocumentLinkMutationProps<D2, L2> & hasLinkMutator<D2, L2>;
  documentLinksShouldBeMutated: (
    existingDocument1Link: any,
    existingDocument2Link: any
  ) => boolean;
  firestoreAdmin: FirestoreAdmin;
}

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

export default async function mutateDocumentLink<D1, L1, D2, L2>(
  props: MutateDocumentLinkProps<D1, L1, D2, L2>
): Promise<[D1, D2]> {
  const {
    document1Props,
    document2Props,
    firestoreAdmin,
    documentLinksShouldBeMutated,
  } = props;

  // Read current data in parallel
  const [document1Data, document2Data] = await Promise.all([
    getDocumentData({ ...document1Props, firestoreAdmin }),
    getDocumentData({ ...document2Props, firestoreAdmin }),
  ]);

  // get pointers to link arrays in documents
  const document1Links = document1Data[document1Props.linksPropName];
  const document2Links = document2Data[document2Props.linksPropName];

  // assert document links are arrays
  if (!Array.isArray(document1Links) || !Array.isArray(document2Links))
    throw Error(
      "Could not inspect document links, one of the document links prop values is not an array"
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

  // avoid any uneccessary writes if documents already linked
  const existingLink1 = document2LinkIdMap[document1Props.id];
  const existingLink2 = document1LinkIdMap[document2Props.id];

  if (!documentLinksShouldBeMutated(existingLink1, existingLink2))
    return [document1Data, document2Data];

  // queue promises to return existing documents by default
  const updatePromises: [Promise<D1>, Promise<D2>] = [
    Promise.resolve(document1Data),
    Promise.resolve(document2Data),
  ];

  const document1IsLinkedToDocument2 = document1LinkIdMap[document2Props.id];

  // only add links if they didnt exist already
  if (!document1IsLinkedToDocument2)
    updatePromises[0] = document1Props.linkMutator({
      currentData: document1Data,
      currentLinks: document1Links,
      documentProps: document1Props,
      firestoreAdmin,
    });

  const document2IsLinkedToDocument1 = document2LinkIdMap[document1Props.id];

  // only add links if they didnt exist already
  if (!document2IsLinkedToDocument1)
    updatePromises[1] = document2Props.linkMutator({
      currentData: document2Data,
      currentLinks: document2Links,
      documentProps: document2Props,
      firestoreAdmin,
    });

  return Promise.all(updatePromises);
}
