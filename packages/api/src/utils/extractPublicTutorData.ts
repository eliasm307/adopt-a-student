import { PublicTutorData } from '../../common/src';
import { functionsHttps } from './firebase-admin';
import isPublicTutorData from './type-predicates/isPublicTutorData';

export default function extractPublicTutorData(data: any): PublicTutorData {
  if (typeof data !== "object")
    throw new functionsHttps.HttpsError(
      "internal",
      `Tutor data could not be extracted as input data is not an object`
    );

  // get only the public properties
  const {
    id,
    userName: username,
    imageUrl,
    introduction,
  } = data as PublicTutorData;

  const publicData = {
    id,
    username,
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
