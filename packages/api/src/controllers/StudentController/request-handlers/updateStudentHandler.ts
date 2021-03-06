import {
  isPrivateStudentData, UpdateStudentRequestBody, UpdateStudentResponseBody,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME } from '../../../constants';
import { AuthData } from '../../../declarations/interfaces';
import { InternalHandler } from '../../../declarations/types';
import studentDataUpdater from '../../../utils/data-updaters/studentDataUpdater';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const updateStudentHandler: InternalHandler<
  UpdateStudentRequestBody & AuthData,
  UpdateStudentResponseBody
> = async (props) => {
  const { updates: inputUpdates, uid } = props;

  const updates = { ...inputUpdates, id: uid };

  const updatedData = await updateDocumentData({
    collectionPath: STUDENT_COLLECTION_NAME,
    documentId: uid,
    updates: updates,
    dataPredicate: isPrivateStudentData,
    dataUpdater: studentDataUpdater,
    firestoreAdmin,
  });

  return { result: updatedData };
};

export default updateStudentHandler;
