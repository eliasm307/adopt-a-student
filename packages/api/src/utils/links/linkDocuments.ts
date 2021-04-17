import { FirestoreAdmin } from '../../declarations/interfaces';
import createLinkAdder from './createLinkAdder';
import { hasLinkToAdd } from './interfaces';
import { documentLinksShouldBeAdded as linksShouldBeAdded } from './linksShouldBeMutated';
import mutateDocumentLink, { DocumentLinkMutationProps } from './mutateDocumentLink';

interface Props<D1, L1, D2, L2> {
  document1Props: DocumentLinkMutationProps<D1, L1> & hasLinkToAdd<L1>;
  document2Props: DocumentLinkMutationProps<D2, L2> & hasLinkToAdd<L2>;
  firestore: FirestoreAdmin;
}
export default async function linkDocuments<D1, L1, D2, L2>(
  props: Props<D1, L1, D2, L2>
) {
  const { firestore, document1Props, document2Props } = props;

  return mutateDocumentLink<D1, L1, D2, L2>({
    document1Props: {
      ...document1Props,
      linkMutator: createLinkAdder({
        linkToAdd: document1Props.linkToAdd,
      }),
    },
    document2Props: {
      ...document2Props,
      linkMutator: createLinkAdder({
        linkToAdd: document2Props.linkToAdd,
      }),
    },
    documentLinksShouldBeMutated: linksShouldBeAdded,
    firestore,
  });
}
