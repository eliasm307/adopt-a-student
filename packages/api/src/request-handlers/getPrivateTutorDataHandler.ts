import { TUTORS_COLLECTION_NAME } from '../constants';
import { ApiGetPrivateStudentDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestore } from '../utils/firebase-admin';
import readDocument from '../utils/readPrivateUserData';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiGetPrivateStudentDataHandler = async (_, context) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  const data = await readDocument({
    dataPredicate: isPrivateStudentData,
    firestore,
    path,
  });

  return {
    data,
  };

  /*
  // check if tutor already exists for this user
  const docSnapshot = await firestore.doc(documentPath).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not read data because a student profile doesnt exist for this user, create one first"
    );

  // read data
  try {
    // const newSnapshot = await docSnapshot.ref.get();

    const data = docSnapshot.data();

    if (!isPrivateStudentData(data))
      throw new functionsHttps.HttpsError(
        "internal",
        "Student data is not in the right format"
      );

    return {
      success: true,
      data,
    };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading the student data",
      JSON.stringify(error)
    );
  }
  */
};

export default handler;
