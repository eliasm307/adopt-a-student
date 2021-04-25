import { GenericSubjectData } from '../..';

export function isGenericSubjectData(data: any): data is GenericSubjectData {
  if (typeof data !== "object") return false;

  const {
    id,
    relatedCategories: categoryIds,
    relatedSubjects: relatedGenericSubjectIds,
    names,
  } = data as GenericSubjectData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: GenericSubjectData = {
    id,
    relatedCategories: categoryIds,
    relatedSubjects: relatedGenericSubjectIds,
    names,
  };

  // todo check if array prop items also match schema
  const hasId = typeof id === "string" && id;
  const hasNames = Array.isArray(names);
  const hasCategoryIds = Array.isArray(categoryIds);
  const hasRelatedGenericSubjectIds = Array.isArray(relatedGenericSubjectIds);

  if (hasId && hasCategoryIds && hasRelatedGenericSubjectIds && hasNames)
    return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
