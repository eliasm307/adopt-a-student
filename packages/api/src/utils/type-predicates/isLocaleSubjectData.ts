import { LocaleSubjectData } from '@adopt-a-student/common';

export default function isLocaleSubjectData(
  data: any
): data is LocaleSubjectData {
  if (typeof data !== "object") return false;

  const {
    dataIsComplete,
    id,
    country,
    tutorIds,
    description,
    genericSubjectId,
    locale,
    studentIds,
  } = data as LocaleSubjectData;

  const hasId = typeof id === "string" && id;
  const hasGenericSubjectId =
    typeof genericSubjectId === "string" && genericSubjectId;
  const hasLocale = typeof locale === "string" && locale;
  const hasDescription = typeof description === "string";
  const hasCountry = typeof country === "string";
  const hasDataIsComplete = typeof dataIsComplete === "boolean";
  const hasStudentIds = Array.isArray(studentIds);
  const hasTutorIds = Array.isArray(tutorIds);

  if (
    hasDataIsComplete &&
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
