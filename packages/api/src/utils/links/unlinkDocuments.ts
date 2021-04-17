import { FirestoreAdmin } from '../../declarations/interfaces';
import createLinkRemover from './createLinkRemover';
import { hasFilterPredicate } from './interfaces';
import { documentLinksShouldBeRemoved as linksShouldBeRemoved } from './linksShouldBeMutated';
import mutateDocumentLink, { DocumentLinkMutationProps } from './mutateDocumentLink';

interface Props<D1, L1, D2, L2> {
  document1Props: DocumentLinkMutationProps<D1, L1> & hasFilterPredicate<L1>;
  document2Props: DocumentLinkMutationProps<D2, L2> & hasFilterPredicate<L2>;
  firestore: FirestoreAdmin;
}
export default async function unlinkDocuments<D1, L1, D2, L2>(
  props: Props<D1, L1, D2, L2>
) {
  const { firestore, document1Props, document2Props } = props;

  return mutateDocumentLink<D1, L1, D2, L2>({
    document1Props: {
      ...document1Props,
      linkMutator: createLinkRemover({
        filterPredicate: document1Props.filterPredicate,
      }),
    },
    document2Props: {
      ...document2Props,
      linkMutator: createLinkRemover({
        filterPredicate: document2Props.filterPredicate,
      }),
    },
    documentLinksShouldBeMutated: linksShouldBeRemoved,
    firestore,
  });
}
