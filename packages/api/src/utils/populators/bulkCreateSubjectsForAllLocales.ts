// todo implement

import {
  GenericSubjectData, localeCodes, localeCountries, LocaleSubjectData, promiseAllSettledAndLog,
} from '@adopt-a-student/common';

import createGenericSubject from '../../controllers/SubjectController/request-handlers/createGenericSubjectHandler';
import createLocaleSubject from '../../controllers/SubjectController/request-handlers/createLocaleSubjectHandler';
import callableContextSpoof from '../firebase/callableContextSpoof';
import createDocument from '../firebase/createDocument';
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
    const countries: string[] = [...localeCountries[locale]];

    if (countries)
      countries.forEach((country) => {
        const localeSubjectData: Omit<LocaleSubjectData, "id"> = {
          country,
          description: `test subject in ${String(
            locale
          )} locale for country ${country}`,
          genericId,
          locale,
          relatedStudents: [],
          relatedTutors: [],
        };
        const localeSubjectPromise = createLocaleSubject(
          {
            data: localeSubjectData,
            genericSubjectId: genericId,
          },
          callableContextSpoof()
        );
        promises.push(localeSubjectPromise);
      });
  });

  const result = await promiseAllSettledAndLog(promises);

  return result;
}
