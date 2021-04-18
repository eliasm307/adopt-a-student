import { PrivateStudentData } from '@adopt-a-student/common';

export function isPrivateStudentData(data: any): data is PrivateStudentData {
  if (typeof data !== "object") return false;

  // check mandatory fields
  const {
    email,
    id,
    relatedSubjects: linkedLocaleSubjects,
    userName,
    relatedTutors: tutors,
    imageUrl,
    introduction,
    prefferedLocales,
  } = data as PrivateStudentData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: PrivateStudentData = {
    email,
    id,
    relatedSubjects: linkedLocaleSubjects,
    userName,
    relatedTutors: tutors,
    imageUrl,
    introduction,
    prefferedLocales,
  };

  const hasEmail = typeof email === "string" && email;
  const hasUserName = typeof userName === "string" && userName;
  const hasId = typeof id === "string" && id;
  const hasRelatedSubjects = Array.isArray(linkedLocaleSubjects);
  const hasTutors = Array.isArray(tutors);
  const hasPreferredLocales = Array.isArray(prefferedLocales);
  const canHaveImage =
    typeof imageUrl === "undefined" || typeof imageUrl === "string";
  const canHaveIntroduction =
    typeof introduction === "undefined" || typeof introduction === "string";

  if (
    hasEmail &&
    hasUserName &&
    hasId &&
    hasRelatedSubjects &&
    hasTutors &&
    canHaveImage &&
    canHaveIntroduction &&
    hasPreferredLocales
  )
    return true;

  console.warn("data is not complete private Student data", { data });
  return false;
}
