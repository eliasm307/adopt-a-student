import { STUDENT_COLLECTION_NAME } from '../constants';
import { ApiUpdateStudentDataHandler } from '../declarations/interfaces';
import studentDataUpdater from '../utils/data-updaters/studentDataUpdater';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import updateDocumentData from '../utils/firebase/updateDocumentData';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import verifyRequest from '../utils/verifyRequest';

const updateStudent: ApiUpdateStudentDataHandler = async (body, context) => {
  const { uid } = verifyRequest(body, context);

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

  const edits = { ...body.data, uid };

  const updatedData = await updateDocumentData({
    collectionPath: STUDENT_COLLECTION_NAME,
    id: uid,
    edits,
    dataPredicate: isPrivateStudentData,
    dataUpdater: studentDataUpdater,
    firestore: firestoreAdmin,
  });

  return { data: updatedData };
};

export default updateStudent;
