import { GenericSubjectCategoryData } from '@adopt-a-student/common';

export default function isGenericSubjectCategoryData(
  data: any
): data is GenericSubjectCategoryData {
  if (typeof data !== "object") return false;

  const { id, localeSubjects } = data as GenericSubjectCategoryData;

  const hasId = typeof id === "string" && id;

  const hasLocaleSubjects = typeof localeSubjects === "object";

  /*
  if (!(hasId && hasLocaleSubjects)) {
    console.warn(
      __filename,
      "Data is not valid, either doesnt have id or locale subjects",
      { data }
    );
    return false;
  }
  */

  // ? check individual sub locale subjects?

  if (hasId && hasLocaleSubjects) return true;

  // ? check key count?

  console.warn(
    __filename,
    "Data is not valid, either doesnt have id or locale subjects",
    { data }
  );
  return false;
}
