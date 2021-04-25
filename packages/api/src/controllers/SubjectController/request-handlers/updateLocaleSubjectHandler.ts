import {
  isLocaleSubjectData, UpdateLocaleSubjectRequestBody, UpdateLocaleSubjectResponseBody,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import localeSubjectDataUpdater from '../../../utils/data-updaters/localeSubjectDataUpdater';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const updateLocaleSubject: InternalHandler<
  UpdateLocaleSubjectRequestBody,
  UpdateLocaleSubjectResponseBody
> = async (props) => {
  const { updates, id } = props;

  const result = await updateDocumentData({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    documentId: id,
    updates: { ...updates, id },
    dataPredicate: isLocaleSubjectData,
    dataUpdater: localeSubjectDataUpdater,
    firestoreAdmin,
  });

  return { result };
};

export default updateLocaleSubject;
