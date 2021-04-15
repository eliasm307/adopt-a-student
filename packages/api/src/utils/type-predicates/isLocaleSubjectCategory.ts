import { LocaleSubjectCategoryData } from '@adopt-a-student/common';

export default function isLocaleSubjectCategoryData(
  data: any
): data is LocaleSubjectCategoryData {
  if (typeof data !== "object") return false;

  const { id, locale, name } = data as LocaleSubjectCategoryData;

  const hasId = typeof id === "string" && id;
  const hasLocale = typeof locale === "string" && locale;
  const hasName = typeof name === "string" && name;

  if (hasId && hasLocale && hasName) return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
