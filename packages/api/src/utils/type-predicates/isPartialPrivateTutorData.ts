import { PrivateTutorData } from '@adopt-a-student/common';

import { functionsHttps } from '../firebase-admin';

export default function isPartialPrivateTutorData(
  data: any
): data is Partial<PrivateTutorData> {
  if (typeof data !== "object") return false;

  // check mandatory fields
  const o = data as PrivateTutorData;

  let propCount = 0;

  // check if any and only possible fields exist
  for (const [key, value] of Object.entries(o)) {
    switch (key as keyof PrivateTutorData) {
      case "dataIsComplete":
        if (typeof value === "boolean") propCount++;
        break;
      case "email":
        if (typeof value === "string") propCount++;
        break;
      case "id":
        if (typeof value === "string") propCount++;
        break;
      case "imageUrl":
        if (typeof value === "string") propCount++;
        break;
      case "introduction":
        if (typeof value === "string") propCount++;
        break;
      case "relatedSubjects":
        if (Array.isArray(value)) propCount++;
        break;
      case "students":
        if (Array.isArray(value)) propCount++;
        break;
      case "userName":
        if (typeof value === "string") propCount++;
        break;
      default:
        throw new functionsHttps.HttpsError(
          "failed-precondition",
          `Request data is not valid, there is an unknown property named ${key}`
        );
    }
  }

  if (!propCount)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      `Request data is not valid, there were no valid properties found`
    );

  return true;
}
