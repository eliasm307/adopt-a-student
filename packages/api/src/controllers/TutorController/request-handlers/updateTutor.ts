import {
  isPrivateTutorData, UpdateTutorRequestBody, UpdateTutorResponseBody,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import tutorDataUpdater from '../../../utils/data-updaters/tutorDataUpdater';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const updateTutor: FirebaseCallableFunctionHandler<
  UpdateTutorRequestBody,
  UpdateTutorResponseBody
> = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (
    !body ||
    !body.updates ||
    typeof body.updates !== "object" ||
    !Object.keys(body.updates).length
  )
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );

  const edits = { ...body.updates, uid };

  const updatedData = await updateDocumentData({
    collectionPath: TUTOR_COLLECTION_NAME,
    id: uid,
    edits,
    dataPredicate: isPrivateTutorData,
    dataUpdater: tutorDataUpdater,
    firestore: firestoreAdmin,
  });

  return { result: updatedData };
};

export default updateTutor;
