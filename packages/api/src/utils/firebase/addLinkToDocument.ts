import updateDocumentData from "./updateDocumentData";

interface AddLinkToDocumentProps<D, L> {
  documentLinkCreater: (link: string) => L;
  documentLinks: L[];
  existingDocument: D;
  linksProp: keyof D;
}

export default async function addLinkToDocument<D, L>({
  documentLinkCreater,
  documentLinks,
  existingDocument,
  linksProp,
}: AddLinkToDocumentProps<D, L>) {
  const documentLinks = existingDocument[linksProp];

  if (!Array.isArray(documentLinks))
    throw Error(
      "Could not link document,  the links prop value is not an array"
    );

  // add link
  document1Links.push(document1LinkCreater(document2Id));

  // create document update promise
  const updatePromise = updateDocumentData({
    ...document1CrudProps,
    edits: document1,
    dataUpdater: ({ edits, existingData }) => ({
      ...existingData,
      [document1LinksProp]: edits[document1LinksProp]!, // overwrite existing links
    }),
  });
}
