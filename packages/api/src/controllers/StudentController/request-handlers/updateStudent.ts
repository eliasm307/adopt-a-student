import {
  isPrivateStudentData, UpdateStudentRequestBody, UpdateStudentResponseBody,
} from '@adopt-a-student/common';

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
    edits,
    dataPredicate: isPrivateStudentData,
    dataUpdater: studentDataUpdater,
    firestore: firestoreAdmin,
  });

  return { result: updatedData };
};

export default updateStudent;
