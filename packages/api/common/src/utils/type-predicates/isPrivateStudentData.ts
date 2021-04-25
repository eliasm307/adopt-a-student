import { PrivateStudentData } from '../..';

export function isPrivateStudentData(data: any): data is PrivateStudentData {
  if (typeof data !== "object") return false;

  // check mandatory fields
  const {
    email,
    id,
    relatedSubjects,
    userName,
    relatedTutors,
    imageUrl,
    introduction,
    prefferedLocales,
    prefferedCountries,
  } = data as PrivateStudentData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: PrivateStudentData = {
    email,
    id,
    relatedSubjects,
    userName,
    relatedTutors,
    imageUrl,
    introduction,
    prefferedLocales,
    prefferedCountries,
  };

  const hasPreferredCountries = Array.isArray(prefferedCountries);
  const hasEmail = typeof email === "string" && email;
  const hasUserName = typeof userName === "string" && userName;
  const hasId = typeof id === "string" && id;
  const hasRelatedSubjects = Array.isArray(relatedSubjects);
  const hasTutors = Array.isArray(relatedTutors);
  const hasPreferredLocales = Array.isArray(prefferedLocales);
  const canHaveImage = !imageUrl || typeof imageUrl === "string";
  const canHaveIntroduction = !introduction || typeof introduction === "string";

  if (
    hasEmail &&
    hasUserName &&
    hasId &&
    hasRelatedSubjects &&
    hasTutors &&
    canHaveImage &&
    canHaveIntroduction &&
    hasPreferredLocales &&
    hasPreferredCountries
  )
    return true;

  console.warn("data is not complete private Student data", { data });
  if (!hasEmail)
    console.error("See hasEmail", {
      hasEmail,
      email,
      typeofEmail: typeof email,
    });
  if (!hasUserName)
    console.error("See hasUserName", {
      hasUserName,
      userName,
      typeof: typeof userName,
    });
  if (!hasId) console.error("See hasId", { hasEmail });
  if (!hasRelatedSubjects)
    console.error("See hasRelatedSubjects", {
      hasRelatedSubjects,
      relatedSubjects,
      typeof: typeof relatedSubjects,
    });
  if (!hasTutors)
    console.error("See hasTutors", {
      hasTutors,
      relatedTutors,
      typeoftutors: typeof relatedTutors,
    });
  if (!canHaveImage) console.error("See canHaveImage", { canHaveImage });
  if (!canHaveIntroduction)
    console.error("See canHaveIntroduction", { canHaveIntroduction });
  if (!hasPreferredLocales)
    console.error("See hasPreferredLocales", {
      hasPreferredLocales,
      prefferedLocales,
      typeofEmail: typeof prefferedLocales,
    });

  return false;
}
