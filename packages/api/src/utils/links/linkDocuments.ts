import createLinkAdder from './createLinkAdder';
import { hasLinkToAdd } from './interfaces';
import { documentLinksShouldBeAdded as linksShouldBeAdded } from './linksShouldBeMutated';
import mutateDocumentLink, { DocumentLinkMutationProps } from './mutateDocumentLink';

export interface AddDocumentLinkProps<D, L>
  extends DocumentLinkMutationProps<D, L>,
    hasLinkToAdd<L> {}

interface Props<D1, L1, D2, L2> {
  document1Props: AddDocumentLinkProps<D1, L1>;
  document2Props: AddDocumentLinkProps<D2, L2>;
  firestoreAdmin;
}
export default async function linkDocuments<D1, L1, D2, L2>(
  props: Props<D1, L1, D2, L2>
) {
  const { firestoreAdmin, document1Props, document2Props } = props;

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
    firestoreAdmin,
  });
}
