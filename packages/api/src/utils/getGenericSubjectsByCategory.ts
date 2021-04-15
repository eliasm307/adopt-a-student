import {
  GenericSubjectData, LocaleSubjectData, PrivateStudentData, PrivateTutorData,
} from '@adopt-a-student/common';

import {
  LOCALE_SUBJECT_COLLECTION_NAME, STUDENTS_COLLECTION_NAME, TUTORS_COLLECTION_NAME,
} from '../constants';
import { FirestoreAdmin } from '../declarations/interfaces';
import { functionsHttps } from './firebase-admin';
import groupArrayItems from './groupArrayItems';

interface Props {
  firestore: FirestoreAdmin;
  subjectCategoryId: string;
}

export default async function getGenericSubjectsByCategory({
  firestore,
  subjectCategoryId,
}: Props) {
  const categoryField: keyof GenericSubjectData = "categoryIds";

  try {
    const genericSubjectsFilteredByCategory = await firestore
    .collection(LOCALE_SUBJECT_COLLECTION_NAME)
    .where(categoryField, "array-contains", subjectCategoryId)
    .get();

    // process and return data
      return genericSubjectsFilteredByCategory.docs.map(doc => {
        if()
      })

  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading data from firestore",
      JSON.stringify({ error })
    );
  }
}
