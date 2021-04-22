import {
  isPrivateTutorData, UpdateTutorRequestBody, UpdateTutorResponseBody,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { AuthData } from '../../../declarations/interfaces';
import { InternalHandler } from '../../../declarations/types';
import tutorDataUpdater from '../../../utils/data-updaters/tutorDataUpdater';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const updateTutorHandler: InternalHandler<
  UpdateTutorRequestBody & AuthData,
  UpdateTutorResponseBody
> = async (props) => {
  const { updates: inputUpdates, uid } = props;

  const updates = { ...inputUpdates, uid };

  const updatedData = await updateDocumentData({
    collectionPath: TUTOR_COLLECTION_NAME,
    documentId: uid,
    updates: updates,
    dataPredicate: isPrivateTutorData,
    dataUpdater: tutorDataUpdater,
    firestoreAdmin,
  });

  return { result: updatedData };
};
export default updateTutorHandler;
