import {
  isPrivateStudentData, UpdateStudentRequestBody, UpdateStudentResponseBody,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import studentDataUpdater from '../../../utils/data-updaters/studentDataUpdater';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const updateStudent: FirebaseCallableFunctionHandler<
  UpdateStudentRequestBody,
  UpdateStudentResponseBody
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
    collectionPath: STUDENT_COLLECTION_NAME,
    id: uid,
    updates: edits,
    dataPredicate: isPrivateStudentData,
    dataUpdater: studentDataUpdater,
    firestore: firestoreAdmin,
  });

  return { result: updatedData };
};

export default updateStudent;
