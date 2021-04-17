import { LocaleSubjectData } from '@adopt-a-student/common';

export function isLocaleSubjectData(data: any): data is LocaleSubjectData {
  if (typeof data !== "object") return false;

  const {
    id,
    country,
    linkedTutorIds: tutorIds,
    description,
    parentId: genericSubjectId,
    locale,
    linkedStudentIds: studentIds,
  } = data as LocaleSubjectData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: LocaleSubjectData = {
    id,
    country,
    linkedTutorIds: tutorIds,
    description,
    parentId: genericSubjectId,
    locale,
    linkedStudentIds: studentIds,
  };

  const hasId = typeof id === "string" && id;
  const hasGenericSubjectId =
    typeof genericSubjectId === "string" && genericSubjectId;
  const hasLocale = typeof locale === "string" && locale;
  const hasDescription = typeof description === "string";
  const hasCountry = typeof country === "string";
  const hasStudentIds = Array.isArray(studentIds);
  const hasTutorIds = Array.isArray(tutorIds);

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
