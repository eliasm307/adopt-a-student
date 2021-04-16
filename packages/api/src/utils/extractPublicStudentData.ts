import { PublicStudentData } from '../../common/src';
import { functionsHttps } from './firebase/firebase-admin';
import isPublicTutorData from './type-predicates/isPublicStudentData';

export default function extractPublicStudentData(data: any): PublicStudentData {
  if (typeof data !== "object")
    throw new functionsHttps.HttpsError(
      "internal",
      `Student data could not be extracted as input data is not an object`
    );

  // get only the public properties
  const {
    id,
    userName: username,
    imageUrl,
    introduction,
  } = data as PublicStudentData;

  const publicData = {
    id,
    username,
    imageUrl,
    introduction,
  };

  if (!isPublicTutorData(publicData))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Student data could not be extracted as it is not the correct format"
    );

  return publicData;
}
