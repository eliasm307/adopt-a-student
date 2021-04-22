import createDocumentPropDataUpdater from '../createDocumentPropDataUpdater';
import updateDocumentData from '../firebase/updateDocumentData';
import { LinkMutatorProps } from './mutateDocumentLink';

interface FactoryProps<D, L> {}

interface Props<D, L> extends LinkMutatorProps<D, L>, FactoryProps<D, L> {}

const documentLinkRemover = async <D, L>({
  documentProps,
  firestoreAdmin,
  currentData,
  currentLinks,
}: Props<D, L>): Promise<D> => {
  const { linksPropName, linkToMutatePredicate } = documentProps;

  // create and return document update promise
  return updateDocumentData({
    ...documentProps,
    firestoreAdmin,
    updates: {
      ...currentData,
      [linksPropName]: currentLinks.filter(
        (link) => !linkToMutatePredicate(link)
      ), // filter out specified link
    },
    dataUpdater: createDocumentPropDataUpdater(linksPropName),
  });
};

const createDocumentLinkRemover = <D, L>(factoryProps: FactoryProps<D, L>) => {
  return (props: LinkMutatorProps<D, L>) =>
    documentLinkRemover({ ...props, ...factoryProps });
};

export default createDocumentLinkRemover;
