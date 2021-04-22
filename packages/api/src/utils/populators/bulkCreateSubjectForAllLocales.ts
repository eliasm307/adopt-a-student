import {
  GenericSubjectData, isGenericSubjectData, localeCodes, localeCountries, LocaleSubjectData,
  promiseAllSettledAndLog,
} from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME } from '../../constants';
import createGenericSubject from '../../controllers/SubjectController/request-handlers/createGenericSubjectHandler';
import createLocaleSubject from '../../controllers/SubjectController/request-handlers/createLocaleSubjectHandler';
import callableContextSpoof from '../firebase/callableContextSpoof';
import createDocument from '../firebase/createDocument';
import { firestoreAdmin } from '../firebase/firebase-admin';
import newGuid from '../newGuid';

interface Props {
  genericSubjectData: Omit<GenericSubjectData, "id">;
}

export default async function bulkCreateSubjectsForAllLocales(props: Props) {
  const { genericSubjectData } = props;

  const { names } = genericSubjectData;

  const genericId = newGuid();

  // create generic subject
  const genericSubject = await createDocument({
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    documentId: genericId,
    data: { ...genericSubjectData, id: genericId },
    dataPredicate: isGenericSubjectData,
    firestoreAdmin,
  });

  const promises: Promise<any>[] = [];

  // create all locale subjects promises
  [...localeCodes].forEach((locale) => {
    const countries: string[] = [...localeCountries[locale]];

    if (countries)
      countries.forEach((country) => {
        const localeSubjectData: Omit<LocaleSubjectData, "id"> = {
          country,
          description: `test subject in ${String(
            locale
          )} locale for country ${country}`,
          name: names[0],
          locale,
          relatedStudents: [],
          relatedTutors: [],
        };

        const localeSubjectPromise = createLocaleSubject({
          data: localeSubjectData,
          genericSubjectId: genericId,
        });

        promises.push(localeSubjectPromise);
      });
  });

  const result = await promiseAllSettledAndLog(promises);

  return result;
}
