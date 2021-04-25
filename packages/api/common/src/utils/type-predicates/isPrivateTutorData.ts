import { PrivateTutorData } from '../..';

export function isPrivateTutorData(data: any): data is PrivateTutorData {
  if (typeof data !== "object") return false;

  // check mandatory fields
  const {
    email,
    id,
    relatedStudents,
    userName,
    prefferedLocales,
    prefferedCountries,
    relatedSubjects,
    available,
    imageUrl,
    introduction,
  } = data as PrivateTutorData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: PrivateTutorData = {
    email,
    id,
    relatedStudents,
    userName,
    prefferedLocales,
    relatedSubjects,
    available,
    imageUrl,
    introduction,
    prefferedCountries,
  };

  const hasPreferredCountries = Array.isArray(prefferedCountries);
  const hasPreferredLocales = Array.isArray(prefferedLocales);
  const hasEmail = typeof email === "string" && email;
  const hasUserName = typeof userName === "string" && userName;
  const hasId = typeof id === "string" && id;
  const hasRelatedSubjects = Array.isArray(relatedStudents);
  const hasStudents = Array.isArray(relatedStudents);
  const hasAvailability = typeof available === "boolean";
  const canHaveImage =
    typeof imageUrl === "undefined" || typeof imageUrl === "string";
  const canHaveIntro =
    typeof introduction === "undefined" || typeof introduction === "string";

  if (
    hasEmail &&
    hasUserName &&
    hasId &&
    hasRelatedSubjects &&
    hasStudents &&
    hasPreferredLocales &&
    canHaveImage &&
    hasAvailability &&
    canHaveIntro &&
    hasPreferredCountries
  )
    return true;

  console.warn("data is not complete private tutor data", { data });
  return false;
}
