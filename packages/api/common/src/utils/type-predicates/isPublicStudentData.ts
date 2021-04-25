import { PublicStudentData } from '../..';

export function isPublicStudentData(data: any): data is PublicStudentData {
  if (typeof data !== "object") return false;

  const {
    id,
    userName,
    imageUrl,
    introduction,
    prefferedLocales,
    prefferedCountries,
  } = data as PublicStudentData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: PublicStudentData = {
    id,
    userName,
    imageUrl,
    prefferedLocales,
    introduction,
    prefferedCountries,
  };

  const hasPreferredCountries = Array.isArray(prefferedCountries);
  const hasPreferredLocales = Array.isArray(prefferedLocales);
  const hasUserName = typeof userName === "string" && userName;
  const canHaveImage = !imageUrl || typeof imageUrl === "string";
  const hasId = typeof id === "string" && id;
  const canHaveIntroduction = !introduction || typeof introduction === "string";

  if (
    hasId &&
    hasUserName &&
    canHaveImage &&
    canHaveIntroduction &&
    hasPreferredLocales &&
    hasPreferredCountries
  )
    return true;

  // ? check key count?

  console.warn(__filename, "Data is not public student data", { data });
  return false;
}
