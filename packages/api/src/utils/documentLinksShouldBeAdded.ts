/** Links should be added if any of the documents dont have existing links */
const documentLinksShouldBeAdded = (
  existingDocument1Link: any,
  existingDocument2Link: any
) => !existingDocument1Link || !existingDocument2Link;

export default documentLinksShouldBeAdded;
