import { FirestoreAdmin } from "../../declarations/interfaces";
import createAddDocumentLinkMutatorFactory from "../createAddDocumentLinkMutatorFactory";
import documentLinksShouldBeAdded from "../documentLinksShouldBeAdded";
import { hasLinkToAdd } from "../links/interfaces";
import mutateDocumentLink, {
  DocumentLinkMutationProps,
} from "./mutateDocumentLink";

interface Props<D1, L1, L2, D2> {
  document1Props: DocumentLinkMutationProps<D1, L1> & hasLinkToAdd<L1>;
  document2Props: DocumentLinkMutationProps<D2, L2> & hasLinkToAdd<L2>;
  firestore: FirestoreAdmin;
}
export default async function linkDocuments<D1, L1, L2, D2>(
  props: Props<D1, L1, L2, D2>
) {
  const { firestore, document1Props, document2Props } = props;

  return mutateDocumentLink<D1, L1, L2, D2>({
    document1Props: {
      ...document1Props,
      createLinkMutator: createAddDocumentLinkMutatorFactory({
        linkToAdd: document1Props.linkToAdd,
      }),
    },
    document2Props: {
      ...document2Props,
      createLinkMutator: createAddDocumentLinkMutatorFactory({
        linkToAdd: document2Props.linkToAdd,
      }),
    },
    documentLinksShouldBeMutated: documentLinksShouldBeAdded,
    firestore,
  });
}
