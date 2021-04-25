import { LinkMutatorProps } from './mutateDocumentLink';

export interface hasLinkToAdd<L> {
  linkToAdd: L;
}

export interface hasLinkMutator<D, L> {
  linkMutator: (props: LinkMutatorProps<D, L>) => Promise<D>;
}
