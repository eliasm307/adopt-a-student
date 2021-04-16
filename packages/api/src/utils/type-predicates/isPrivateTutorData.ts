import { PrivateTutorData } from '@adopt-a-student/common';

export default function isPrivateTutorData(
  data: any
): data is PrivateTutorData {
  if (typeof data !== "object") return false;

  // check mandatory fields
  const {
    email,
    id,
    subjects: relatedSubjects,
    linkedStudents: students,
    userName,
    prefferedLocales,
  } = data as PrivateTutorData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: PrivateTutorData = {
    email,
    id,
    subjects: relatedSubjects,
    linkedStudents: students,
    userName,
    prefferedLocales,
  };

  const hasPreferredLocales = Array.isArray(prefferedLocales);
  const hasEmail = typeof email === "string" && email;
  const hasUserName = typeof userName === "string" && userName;
  const hasId = typeof id === "string" && id;
  const hasRelatedSubjects = Array.isArray(relatedSubjects);
  const hasStudents = Array.isArray(students);

  if (
    hasEmail &&
    hasUserName &&
    hasId &&
    hasRelatedSubjects &&
    hasStudents &&
    hasPreferredLocales
  )
    return true;

  console.warn("data is not complete private tutor data", { data });
  return false;
}
