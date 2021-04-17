/** Links should be added if any of the documents dont have existing links */
export const documentLinksShouldBeAdded = (
  existingDocument1Link: any,
  existingDocument2Link: any
) => !existingDocument1Link || !existingDocument2Link;

/** Links should be removed if any of the documents have existing links */
export const documentLinksShouldBeRemoved = (
  existingDocument1Link: any,
  existingDocument2Link: any
) => existingDocument1Link || existingDocument2Link;
