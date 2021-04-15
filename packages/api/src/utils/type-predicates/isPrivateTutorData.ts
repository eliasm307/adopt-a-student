import { PrivateTutorData } from '@adopt-a-student/common';

export default function isPrivateTutorData(
  data: any
): data is PrivateTutorData {
  if (typeof data !== "object") return false;

  // check mandatory fields
  const {
    email,
    id,
    relatedSubjects,
    students,
    userName,
  } = data as PrivateTutorData;

  const hasEmail = typeof email === "string" && email;
  const hasUserName = typeof userName === "string" && userName;
  const hasId = typeof id === "string" && id;
  const hasRelatedSubjects = Array.isArray(relatedSubjects);
  const hasStudents = Array.isArray(students);

  if (hasEmail && hasUserName && hasId && hasRelatedSubjects && hasStudents)
    return true;

  console.warn("data is not complete private tutor data", { data });
  return false;
}
