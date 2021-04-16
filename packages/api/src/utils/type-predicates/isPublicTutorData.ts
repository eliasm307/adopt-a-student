import { PublicTutorData } from '@adopt-a-student/common';

export default function isPublicTutorData(data: any): data is PublicTutorData {
  if (typeof data !== "object") return false;

  const {
    id,
    userName,
    imageUrl,
    introduction,
    available,
    prefferedLocales,
  } = data as PublicTutorData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: PublicTutorData = {
    id,
    userName,
    imageUrl,
    prefferedLocales,
    introduction,
    available,
  };

  const hasPreferredLocales = Array.isArray(prefferedLocales);
  const hasUserName = typeof userName === "string" && userName;
  const canHaveImage =
    typeof imageUrl === "undefined" ||
    (typeof imageUrl === "string" && imageUrl);
  const hasId = typeof id === "string" && id;
  const canHaveIntroduction =
    typeof introduction === "undefined" || typeof introduction === "string";

  const hasAvailable = typeof available === "boolean";

  if (
    hasId &&
    hasUserName &&
    hasAvailable &&
    canHaveImage &&
    canHaveIntroduction &&
    hasPreferredLocales
  )
    return true;

  // ? check key count?

  console.warn(__filename, "Data is not public Tutor data");
  return false;
}
