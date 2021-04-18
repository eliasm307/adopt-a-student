import {
  GenericSubjectData, isLocaleSubjectData, LocaleCode, LocaleSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { FirestoreAdmin } from '../../../declarations/interfaces';
import { functionsHttps } from '../../../utils/firebase/firebase-admin';

interface Props {
  firestoreAdmin: FirestoreAdmin;
  genericSubject: GenericSubjectData;
  locale: LocaleCode;
}

export default async function getLocaleSubjectFromGenericSubject({
  firestoreAdmin,
  genericSubject,
  locale,
}: Props) {
  const genericIdField: keyof LocaleSubjectData = "parentId";
  const localeField: keyof LocaleSubjectData = "locale";

  try {
    const localeSubjectsFilteredByGenericId = await firestoreAdmin
      .collection(LOCALE_SUBJECT_COLLECTION_NAME)
      .where(genericIdField, "==", genericSubject.id)
      .where(localeField, "==", locale)
      .get();

    const resultCount = localeSubjectsFilteredByGenericId.docs.length;

    // ? should this check doc exists?
    const resultData = localeSubjectsFilteredByGenericId.docs.map((doc) =>
      doc.data()
    );

    // check any results found
    if (resultCount === 0)
      throw new functionsHttps.HttpsError(
        "not-found",
        `Could not find locale subject for generic subject id "${genericSubject.id}" and locale "${locale}"`,
        JSON.stringify({ __filename })
      );

    // check if multiple results found
    if (resultCount > 1)
      console.warn(
        __filename,
        `Muiltiple locale subjects founf for generic subject id "${genericSubject.id}" and locale "${locale}", there should only be one`,
        JSON.stringify({ resultData, resultCount })
      );

    // use the first result
    const localeSubject = resultData[0];

    // process and return data
    if (!isLocaleSubjectData(localeSubject))
      throw new functionsHttps.HttpsError(
        "internal",
        `Locale subject data not valid`,
        { __filename }
      );

    return localeSubject;
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading data from firestore",
      JSON.stringify({ __filename, error })
    );
  }
}
