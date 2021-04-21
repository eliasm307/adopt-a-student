// todo implement

import {
  GenericSubjectData, isGenericSubjectData, isLocaleSubjectData, LocaleSubjectData,
} from '@adopt-a-student/common';

import { localeCodes, localeCountries } from '../../../common/src/utils/locales';
import { GENERIC_SUBJECT_COLLECTION_NAME, LOCALE_SUBJECT_COLLECTION_NAME } from '../../constants';
import createGenericSubject from '../../controllers/SubjectController/request-handlers/createGenericSubjectHandler';
import { createLocaleSubjectId } from '../../controllers/SubjectController/utils/localeSubjectId';
import callableContextSpoof from '../firebase/callableContextSpoof';
import createDocument from '../firebase/createDocument';
import newGuid from '../newGuid';

interface Props {
  genericSubjectData: Omit<GenericSubjectData, "id">;
}

export default async function bulkCreateSubjectsForAllLocales(props: Props) {
  const { genericSubjectData } = props;

  // create generic subject

  const { subject: genericSubject } = await createGenericSubject(
    { data: genericSubjectData },
    callableContextSpoof()
  );

  const { id: genericId } = genericSubject;

  const promises: Promise<any>[] = [];

  localeCodes.forEach((locale) => {
    const localeSubjectData: Omit<LocaleSubjectData, "id"> = {
      country: localeCountries,
    };

    const localeSubjectPromise = createDocument({
      collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
      id: createLocaleSubjectId({ genericId, locale }),
      data,
      dataPredicate: isGenericSubjectData,
      firestoreAdmin,
    });
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
