import { FirestoreAdmin } from '../../declarations/interfaces';
import createLinkRemover from './createLinkRemover';
import { documentLinksShouldBeRemoved as linksShouldBeRemoved } from './linksShouldBeMutated';
import mutateDocumentLink, { DocumentLinkMutationProps } from './mutateDocumentLink';

export interface RemoveDocumentLinkProps<D, L>
  extends DocumentLinkMutationProps<D, L> {}

interface Props<D1, L1, D2, L2> {
  document1Props: RemoveDocumentLinkProps<D1, L1>;
  document2Props: RemoveDocumentLinkProps<D2, L2>;
  firestoreAdmin: FirestoreAdmin;
}
export default async function unlinkDocuments<D1, L1, D2, L2>(
  props: Props<D1, L1, D2, L2>
) {
  const { firestoreAdmin, document1Props, document2Props } = props;

  return mutateDocumentLink<D1, L1, D2, L2>({
    document1Props: {
      ...document1Props,
      linkMutator: createLinkRemover({
        linkToRemovePredicate: document1Props.linkToMutatePredicate,
      }),
    },
    document2Props: {
      ...document2Props,
      linkMutator: createLinkRemover({
        linkToRemovePredicate: document2Props.linkToMutatePredicate,
      }),
    },
    documentLinksShouldBeMutated: linksShouldBeRemoved,
    firestoreAdmin,
  });
}
