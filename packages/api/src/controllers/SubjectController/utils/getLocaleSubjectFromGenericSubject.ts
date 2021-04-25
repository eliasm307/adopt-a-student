import {
  Country, GenericSubjectData, isLocaleSubjectData, LocaleCode, LocaleSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { FirestoreAdmin } from '../../../declarations/interfaces';
import createPath from '../../../utils/createPath';
import { functionsHttps } from '../../../utils/firebase/firebase-admin';
import { createLocaleSubjectDocumentId } from './localeSubjectDocumentId';

interface Props {
  country: Country;
  firestoreAdmin: FirestoreAdmin;
  genericSubject: GenericSubjectData;
  locale: LocaleCode;
}

export default async function getLocaleSubjectFromGenericSubject({
  firestoreAdmin,
  genericSubject,
  locale,
  country,
}: Props) {
  const genericIdField: keyof LocaleSubjectData = "id";
  const localeField: keyof LocaleSubjectData = "locale";

  try {
    /*
    const localeSubjectsFilteredByGenericId = await firestoreAdmin
      .collection(LOCALE_SUBJECT_COLLECTION_NAME)
      .where(genericIdField, "==", genericSubject.id)
      .where(localeField, "==", locale)
      .get();

      // filter out any docs that dont "exist"
    const results = localeSubjectsFilteredByGenericId.docs.filter(
      (doc) => doc.exists
    );

    const resultCount = results.length;

    const resultData = results.map((doc) => doc.data());

    // check any results found
    if (resultCount === 0)
      throw new functionsHttps.HttpsError(
        "not-found",
        `Could not find locale subject for generic subject id "${genericSubject.id}" and locale "${locale}"`,
        JSON.stringify({ __filename })
      );

    // ? should this throw
    // check if multiple results found
    if (resultCount > 1)
      console.warn(
        __filename,
        `Muiltiple locale subjects founf for generic subject id "${genericSubject.id}" and locale "${locale}", there should only be one`,
        JSON.stringify({ resultData, resultCount })
      );
      */

    const documentId = createLocaleSubjectDocumentId({
      country,
      genericId: genericSubject.id,
      locale,
    });

    const localeSubjectDoc = await firestoreAdmin
      .doc(createPath(LOCALE_SUBJECT_COLLECTION_NAME, documentId))
      .get();

    if (!localeSubjectDoc.exists)
      throw new functionsHttps.HttpsError(
        "not-found",
        `Could not find locale subject for generic subject id "${genericSubject.id}", locale "${locale}, and country "${country}""`,
        JSON.stringify({ __filename })
      );

    // use the first result
    const localeSubject = localeSubjectDoc.data();

    // process and return data
    if (!isLocaleSubjectData(localeSubject))
      throw new functionsHttps.HttpsError(
        "internal",
        `Locale subject data was found but it is not valid`,
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
