import { PrivateStudentData } from '@adopt-a-student/common';

export default function isPrivateStudentData(
  data: any
): data is PrivateStudentData {
  if (typeof data !== "object") return false;

  // check mandatory fields
  const {
    dataIsComplete,
    email,
    id,
    relatedSubjects,
    userName,
    tutors,
    imageUrl,
    introduction,
  } = data as PrivateStudentData;

  const hasDataIsComplete = typeof dataIsComplete === "boolean";

  const hasEmail = typeof email === "string" && email;
  const hasUserName = typeof userName === "string" && userName;
  const hasId = typeof id === "string" && id;
  const hasRelatedSubjects = Array.isArray(relatedSubjects);
  const hasTutors = Array.isArray(tutors);
  const canHaveImage =
    typeof imageUrl === "undefined" || typeof imageUrl === "string";
  const canHaveIntroduction =
    typeof introduction === "undefined" || typeof introduction === "string";

  if (
    hasEmail &&
    hasDataIsComplete &&
    hasUserName &&
    hasId &&
    hasRelatedSubjects &&
    hasTutors &&
    canHaveImage &&
    canHaveIntroduction
  )
    return true;

  console.warn("data is not complete private Student data", { data });
  return false;
}
