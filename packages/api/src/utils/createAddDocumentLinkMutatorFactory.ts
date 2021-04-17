import createDocumentPropDataUpdater from './createDocumentPropDataUpdater';
import { CreateLinkMutatorProps } from './firebase/mutateDocumentLink';
import updateDocumentData from './firebase/updateDocumentData';
import { hasLinkToAdd } from './links/interfaces';

interface FactoryProps<D, L> extends hasLinkToAdd<L> {}

interface Props<D, L>
  extends CreateLinkMutatorProps<D, L>,
    FactoryProps<D, L> {}

const createAddDocumentLinkMutator = async <D, L>({
  documentProps,
  firestore,
  currentData,
  currentLinks,
  linkToAdd,
}: Props<D, L>): Promise<D> => {
  const { linksPropName } = documentProps;

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

const createAddDocumentLinkMutatorFactory = <D, L>({
  linkToAdd,
}: FactoryProps<D, L>) => {
  return (props: CreateLinkMutatorProps<D, L>) =>
    createAddDocumentLinkMutator({ ...props, linkToAdd });
};

export default createAddDocumentLinkMutatorFactory;
