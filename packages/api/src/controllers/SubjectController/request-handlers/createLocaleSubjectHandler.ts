import {
  CreateLocaleSubjectRequestBody as CreateLocaleSubjectRequestBody,
  CreateLocaleSubjectResponseBody as CreateLocaleSubjectResponseBody, isLocaleSubjectData,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, LOCALE_SUBJECT_COLLECTION_NAME,
} from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import newGuid from '../../../utils/newGuid';
import verifyRequest from '../../../utils/verifyRequest';
import { createLocaleSubjectDocumentId } from '../utils/localeSubjectDocumentId';

const createLocaleSubject: InternalHandler<
  CreateLocaleSubjectRequestBody,
  CreateLocaleSubjectResponseBody
> = async (props) => {
  const { genericSubjectId: genericId, data: inputData } = props;

  const { country, locale } = inputData;

  const genericSubjectRef = await firestoreAdmin
    .doc(createPath(GENERIC_SUBJECT_COLLECTION_NAME, genericId))
    .get();

  if (!genericSubjectRef.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not create a locale subject for a generic subject that doesnt exist"
    );

  // id is generated from generic id
  const id = createLocaleSubjectDocumentId({
    genericId: genericId,
    locale,
    country,
  });

  const localeSubjectData = { ...props.data, id };

  const subject = await createDocument({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    documentId: id,
    data: localeSubjectData,
    dataPredicate: isLocaleSubjectData,
    firestoreAdmin,
  });

  return {
    subject,
  } as CreateLocaleSubjectResponseBody;
};

export default createLocaleSubject;
