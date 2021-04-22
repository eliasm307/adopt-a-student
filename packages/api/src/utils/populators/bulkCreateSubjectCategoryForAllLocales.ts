import {
  GenericSubjectCategoryData, localeCodes, localeCountries, LocaleSubjectData,
  promiseAllSettledAndLog,
} from '@adopt-a-student/common';

import createSubjectCategory from '../../controllers/SubjectCategoryController/request-handlers/createSubjectCategoryHandler';
import createGenericSubject from '../../controllers/SubjectController/request-handlers/createGenericSubjectHandler';
import createLocaleSubject from '../../controllers/SubjectController/request-handlers/createLocaleSubjectHandler';
import callableContextSpoof from '../firebase/callableContextSpoof';

interface Props {
  genericSubjectData: Omit<GenericSubjectCategoryData, "id">;
}

export default async function bulkCreateSubjectCategoryForAllLocales(
  props: Props
) {
  const { genericSubjectData } = props;

  // create generic subject

  const { genericSubject } = await createSubjectCategory(
    { data: genericSubjectData, locale, name },
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
