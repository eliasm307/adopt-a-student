import { GenericSubjectData } from '@adopt-a-student/common';

export default function isGenericSubjectData(
  data: any
): data is GenericSubjectData {
  if (typeof data !== "object") return false;

  const {
    dataIsComplete,
    id,
    categoryIds,
    relatedGenericSubjectIds,
  } = data as GenericSubjectData;

  const hasId = typeof id === "string" && id;
  const hasDataIsComplete = typeof dataIsComplete === "boolean";
  const hasCategoryIds = Array.isArray(categoryIds);
  const hasRelatedGenericSubjectIds = Array.isArray(relatedGenericSubjectIds);

  if (
    hasDataIsComplete &&
    hasId &&
    hasCategoryIds &&
    hasRelatedGenericSubjectIds
  )
    return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
