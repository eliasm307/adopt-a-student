import { LocaleSubjectCategoryData } from '@adopt-a-student/common';

export function isLocaleSubjectCategoryData(
  data: any
): data is LocaleSubjectCategoryData {
  if (typeof data !== "object") return false;

  const { parentId: id, locale, name } = data as LocaleSubjectCategoryData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: LocaleSubjectCategoryData = {
    parentId: id,
    locale,
    name,
  };

  const hasId = typeof id === "string" && id;
  const hasLocale = typeof locale === "string" && locale;
  const hasName = typeof name === "string" && name;

  if (hasId && hasLocale && hasName) return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
