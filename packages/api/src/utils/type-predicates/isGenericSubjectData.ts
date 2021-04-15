import { GenericSubjectData } from '@adopt-a-student/common';

export default function isGenericSubjectData(
  data: any
): data is GenericSubjectData {
  if (typeof data !== "object") return false;

  const {
    id,
    categoryIds,
    relatedGenericSubjectIds,
  } = data as GenericSubjectData;

  const hasId = typeof id === "string" && id;

  const hasCategoryIds = Array.isArray(categoryIds);
  const hasRelatedGenericSubjectIds = Array.isArray(relatedGenericSubjectIds);

  if (hasId && hasCategoryIds && hasRelatedGenericSubjectIds) return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
