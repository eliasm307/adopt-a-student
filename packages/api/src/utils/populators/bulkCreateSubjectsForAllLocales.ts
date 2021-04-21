// todo implement

import {
  GenericSubjectData, isGenericSubjectData, LocaleSubjectData,
} from '@adopt-a-student/common';

import { localeCodes } from '../../../common/src/utils/locales';
import promiseAllSettledAndLog from '../../../common/src/utils/promiseAllSettledAndLog';
import { GENERIC_SUBJECT_COLLECTION_NAME } from '../../constants';
import createGenericSubject from '../../controllers/SubjectController/request-handlers/createGenericSubjectHandler';
import { createLocaleSubjectId } from '../../controllers/SubjectController/utils/localeSubjectId';
import callableContextSpoof from '../firebase/callableContextSpoof';
import createDocument from '../firebase/createDocument';
import { firestoreAdmin } from '../firebase/firebase-admin';
import newGuid from '../newGuid';
import getRandomLocaleCountry from './getRandomLocaleCountry';

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

  // create all locale subjects promises
  [...localeCodes].forEach((locale) => {
    const localeSubjectData: Omit<LocaleSubjectData, "id"> = {
      country: getRandomLocaleCountry(locale),
      description: `test subject in ${String(locale)} locale`,
      genericId,
      locale,
      relatedStudents: [],
      relatedTutors: [],
    };

    const localeSubjectPromise = createDocument({
      collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
      id: createLocaleSubjectId({ genericId, locale }),
      data: localeSubjectData,
      dataPredicate: isGenericSubjectData,
      firestoreAdmin,
    });

    promises.push(localeSubjectPromise);
  });

  return promiseAllSettledAndLog(promises);
}
