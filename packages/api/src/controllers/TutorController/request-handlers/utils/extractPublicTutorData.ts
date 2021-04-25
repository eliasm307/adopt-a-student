import { isPublicTutorData, PublicTutorData } from '@adopt-a-student/common';

import { functionsHttps } from '../../../../utils/firebase/firebase-admin';

export default function extractPublicTutorData(
  data: Record<string, any>
): PublicTutorData {
  if (typeof data !== "object")
    throw new functionsHttps.HttpsError(
      "internal",
      `Tutor data could not be extracted as input data is not an object`
    );

  // get only the public properties
  const {
    id,
    userName,
    imageUrl,
    introduction,
    available,
    prefferedCountries,
    prefferedLocales,
  } = data as PublicTutorData;

  const publicData: PublicTutorData = {
    id,
    available,
    prefferedCountries,
    prefferedLocales,
    userName,
    imageUrl,
    introduction,
  };

  if (!isPublicTutorData(publicData))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Tutor data could not be extracted as it is not the correct format"
    );

  return publicData;
}
