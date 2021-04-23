import { localeCodes, localeCountries, promiseAllSettledAndLog } from '@adopt-a-student/common';

import createSubjectCategory from '../../controllers/SubjectCategoryController/request-handlers/createSubjectCategoryHandler';
import updateSubjectCategory from '../../controllers/SubjectCategoryController/request-handlers/updateSubjectCategoryHandler';
import createLocaleSubject from '../../controllers/SubjectController/request-handlers/createLocaleSubjectHandler';
import updateLocaleSubject from '../../controllers/SubjectController/request-handlers/updateLocaleSubjectHandler';
import callableContextSpoof from '../firebase/callableContextSpoof';

interface Props {
  name: string;
}

export default async function bulkCreateSubjectCategoryForAllLocales(
  props: Props
) {
  const { name } = props;

  // create generic subject

  const {
    result: { id },
  } = await createSubjectCategory({
    locale: "en",
    name,
  });

  const promises: Promise<any>[] = [];

  // create all locale subjects promises
  [...localeCodes].forEach((locale) => {
    const countries: string[] = [...Object.keys(localeCountries[locale])];

    if (countries)
      countries.forEach((country) => {
        const localeSubjectPromise = updateSubjectCategory({
          id,
          locale,
          updates: { name: `${name} (${country} in language ${locale})` },
        });

        promises.push(localeSubjectPromise);
      });
  });

  const result = await promiseAllSettledAndLog(promises);

  return result;
}
