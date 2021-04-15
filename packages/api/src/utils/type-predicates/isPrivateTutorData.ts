import { PrivateTutorData } from '@adopt-a-student/common';

export default function isPrivateTutorData(
  data: any
): data is PrivateTutorData {
  if (typeof data !== "object") return false;

  // check mandatory fields
  const {
    dataIsComplete,
    email,
    id,
    relatedSubjects,
    students,
    username,
  } = data as PrivateTutorData;

  const hasDataIsComplete = typeof dataIsComplete === "boolean";

  const hasEmail = typeof email === "string" && email;
  const hasUserName = typeof username === "string" && username;
  const hasId = typeof id === "string" && id;
  const hasRelatedSubjects = Array.isArray(relatedSubjects);
  const hasStudents = Array.isArray(students);

  if (
    hasEmail &&
    hasDataIsComplete &&
    hasUserName &&
    hasId &&
    hasRelatedSubjects &&
    hasStudents
  )
    return true;

  console.warn("data is not complete private tutor data", { data });
  return false;
}
