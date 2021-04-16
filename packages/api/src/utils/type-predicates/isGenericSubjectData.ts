import { GenericSubjectData } from '@adopt-a-student/common';

export default function isGenericSubjectData(
  data: any
): data is GenericSubjectData {
  if (typeof data !== "object") return false;

  const {
    id,
    categoryIds,
    linkedGenericSubjectIds: relatedGenericSubjectIds,
  } = data as GenericSubjectData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: GenericSubjectData = {
    id,
    categoryIds,
    linkedGenericSubjectIds: relatedGenericSubjectIds,
  };

  const hasId = typeof id === "string" && id;

  const hasCategoryIds = Array.isArray(categoryIds);
  const hasRelatedGenericSubjectIds = Array.isArray(relatedGenericSubjectIds);

  if (hasId && hasCategoryIds && hasRelatedGenericSubjectIds) return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
