import { STUDENTS_COLLECTION_NAME } from '../constants';
import { ApiUpdateStudentDataHandler } from '../declarations/interfaces';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import studentDataUpdater from '../utils/studentDataUpdater';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import updateDocumentData from '../utils/updateDocumentData';
import verifyRequest from '../utils/verifyRequest';

const updateStudent: ApiUpdateStudentDataHandler = async (body, context) => {
  const auth = verifyRequest(body, context);

  // verify received data
  if (
    !body ||
    !body.data ||
    typeof body.data !== "object" ||
    !Object.keys(body.data).length
  )
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );

  const updatedData = await updateDocumentData({
    collectionPath: STUDENTS_COLLECTION_NAME,
    id: auth.uid,
    edits: body?.data,
    dataPredicate: isPrivateStudentData,
    dataUpdater: studentDataUpdater,
    firestore,
  });

  return { data: updatedData };
};

export default updateStudent;
