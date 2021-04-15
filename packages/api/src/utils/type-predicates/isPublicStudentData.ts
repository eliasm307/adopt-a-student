import { PublicStudentData } from '@adopt-a-student/common';

export default function isPublicStudentData(
  data: any
): data is PublicStudentData {
  if (typeof data !== "object") return false;

  const { id, userName, imageUrl, introduction } = data as PublicStudentData;

  const hasUserName = typeof userName === "string" && userName;
  const canHaveImage =
    typeof imageUrl === "undefined" ||
    (typeof imageUrl === "string" && imageUrl);
  const hasId = typeof id === "string" && id;
  const canHaveIntroduction =
    typeof introduction === "undefined" || typeof introduction === "string";

  if (hasId && hasUserName && canHaveImage && canHaveIntroduction) return true;

  // ? check key count?

  console.warn(__filename, "Data is not public student data");
  return false;
}
