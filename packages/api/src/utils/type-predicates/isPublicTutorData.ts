import { PublicTutorData } from '@adopt-a-student/common';

export default function isPublicTutorData(data: any): data is PublicTutorData {
  if (typeof data !== "object") return false;

  const {
    id,
    userName,
    imageUrl,
    introduction,
    available,
  } = data as PublicTutorData;

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
    canHaveIntroduction
  )
    return true;

  // ? check key count?

  console.warn(__filename, "Data is not public Tutor data");
  return false;
}
