import { DataUpdater } from '../declarations/types';

/** Util to create a document updater for the links property
 * when mutating a document */
const createDocumentPropDataUpdater = <D>(
  linksProp: keyof D
): DataUpdater<D> => {
  return ({ edits, existingData }) => ({
    ...existingData,
    [linksProp]: edits[linksProp]!, // overwrite existing links only
  });
};

export default createDocumentPropDataUpdater;
