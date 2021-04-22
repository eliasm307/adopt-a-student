import {
  CreateTutorRequestBody, CreateTutorResponseBody, isPrivateTutorData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import verifyRequest from '../../../utils/verifyRequest';

const createTutor: InternalHandler<
  CreateTutorRequestBody,
  CreateTutorResponseBody
> = async (body, context) => {
  if (!body)
    throw new functionsHttps.HttpsError(
      "invalid-argument",
      "Body not provided"
    );

  const auth = verifyRequest(body, context);

  const { tutor: tutorParams } = body;

  // make sure data uses user id
  const data = { ...tutorParams, id: auth.uid };

  const tutor = await createDocument({
    collectionPath: TUTOR_COLLECTION_NAME,
    id: auth.uid,
    data,
    dataPredicate: isPrivateTutorData,
    firestoreAdmin,
  });

  return {
    tutor,
  };
  // todo delete
  /*
  // verify received data
  if (!isPrivateTutorData(data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not create tutor because provided data is not valid/complete"
    );

  const documentPath = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  // check if tutor already exists for this user
  const docRef = await firestoreAdmin.doc(documentPath).get();

  if (docRef.exists)
    // ! dont throw error if there is an existing tutor, its not that deep
    return {
      success: false,
      data,
      message:
        "Could not create tutor because a tutor already exists for the requesting user",
    };

  // create tutor
  try {
    await firestoreAdmin.doc(documentPath).set(data);
    return { success: true, data };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue creating the tutor",
      JSON.stringify(data)
    );
  }
  */
};

export default createTutor;
