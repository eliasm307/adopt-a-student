import createDocumentPropDataUpdater from '../createDocumentPropDataUpdater';
import updateDocumentData from '../firebase/updateDocumentData';
import { hasFilterPredicate } from './interfaces';
import { LinkMutatorProps } from './mutateDocumentLink';

interface FactoryProps<D, L> extends hasFilterPredicate<L> {}

interface Props<D, L> extends LinkMutatorProps<D, L>, FactoryProps<D, L> {}

const documentLinkRemover = async <D, L>({
  documentProps,
  firestore,
  currentData,
  currentLinks,
  filterPredicate,
}: Props<D, L>): Promise<D> => {
  const { linksPropName } = documentProps;

  // create and return document update promise
  return updateDocumentData({
    ...documentProps,
    firestore,
    edits: {
      ...currentData,
      [linksPropName]: currentLinks.filter(filterPredicate), // remove link
    },
    dataUpdater: createDocumentPropDataUpdater(linksPropName),
  });
};

const createDocumentLinkRemover = <D, L>(factoryProps: FactoryProps<D, L>) => {
  return (props: LinkMutatorProps<D, L>) =>
    documentLinkRemover({ ...props, ...factoryProps });
};

export default createDocumentLinkRemover;
