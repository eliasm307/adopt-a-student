// todo implement

import { isGenericSubjectData, isLocaleSubjectData } from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME, LOCALE_SUBJECT_COLLECTION_NAME } from '../../constants';
import createDocument from '../firebase/createDocument';
import newGuid from '../newGuid';

interface Props {
  subjectName: string;
}

export default async function bulkCreateSubjectsForAllLocales(props: Props) {
  const genericSubjectId = newGuid();

  // create generic subject
  const subject = await createDocument({
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    id: genericSubjectGu,
    data,
    dataPredicate: isGenericSubjectData,
    firestoreAdmin,
  });

  // create all locale subjects

  const subject = await createDocument({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id,
    data,
    dataPredicate: isLocaleSubjectData,
    firestoreAdmin,
  });
}
