import { LocaleSubjectData } from '../..';

export function isLocaleSubjectData(data: any): data is LocaleSubjectData {
  if (typeof data !== "object") return false;

  const {
    id,
    country,
    relatedTutors,
    description,
    genericId: genericSubjectId,
    locale,
    relatedStudents,
  } = data as LocaleSubjectData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: LocaleSubjectData = {
    id,
    country,
    relatedTutors,
    description,
    genericId: genericSubjectId,
    locale,
    relatedStudents,
  };

  const hasId = typeof id === "string" && id;
  const hasGenericSubjectId =
    typeof genericSubjectId === "string" && genericSubjectId;
  const hasLocale = typeof locale === "string" && locale;
  const hasDescription = typeof description === "string";
  const hasCountry = typeof country === "string";
  const hasStudentIds = Array.isArray(relatedStudents);
  const hasTutorIds = Array.isArray(relatedTutors);

  if (
    hasId &&
    hasStudentIds &&
    hasTutorIds &&
    hasLocale &&
    hasGenericSubjectId &&
    hasDescription &&
    hasCountry
  )
    return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
