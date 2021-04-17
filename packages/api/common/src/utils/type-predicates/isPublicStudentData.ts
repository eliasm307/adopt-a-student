import { PublicStudentData } from '@adopt-a-student/common';

export function isPublicStudentData(data: any): data is PublicStudentData {
  if (typeof data !== "object") return false;

  const {
    id,
    userName,
    imageUrl,
    introduction,
    prefferedLocales,
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
  };

  const hasPreferredLocales = Array.isArray(prefferedLocales);
  const hasUserName = typeof userName === "string" && userName;
  const canHaveImage =
    typeof imageUrl === "undefined" ||
    (typeof imageUrl === "string" && imageUrl);
  const hasId = typeof id === "string" && id;
  const canHaveIntroduction =
    typeof introduction === "undefined" || typeof introduction === "string";

  if (
    hasId &&
    hasUserName &&
    canHaveImage &&
    canHaveIntroduction &&
    hasPreferredLocales
  )
    return true;

  // ? check key count?

  console.warn(__filename, "Data is not public student data");
  return false;
}
