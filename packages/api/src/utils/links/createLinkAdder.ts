import createDocumentPropDataUpdater from '../createDocumentPropDataUpdater';
import updateDocumentData from '../firebase/updateDocumentData';
import { hasLinkToAdd } from './interfaces';
import { LinkMutatorProps } from './mutateDocumentLink';

interface FactoryProps<D, L> extends hasLinkToAdd<L> {}

interface Props<D, L> extends LinkMutatorProps<D, L>, FactoryProps<D, L> {}

const addDocumentLinkMutator = async <D, L>({
  documentProps,
  firestoreAdmin,
  currentData,
  currentLinks,
  linkToAdd,
}: Props<D, L>): Promise<D> => {
  const { linksPropName } = documentProps;

  // create and return document update promise
  return updateDocumentData({
    ...documentProps,
    firestoreAdmin,
    updates: {
      ...currentData,
      [linksPropName]: [...currentLinks, linkToAdd], // add link
    },
    dataUpdater: createDocumentPropDataUpdater(linksPropName),
  });
};

const createAddDocumentLinkMutator = <D, L>(
  factoryProps: FactoryProps<D, L>
) => {
  return (props: LinkMutatorProps<D, L>) =>
    addDocumentLinkMutator({ ...props, ...factoryProps });
};

export default createAddDocumentLinkMutator;
