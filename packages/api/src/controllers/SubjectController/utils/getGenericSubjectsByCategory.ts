import { GenericSubjectData, isGenericSubjectData } from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { FirestoreAdmin } from '../../../declarations/interfaces';
import { functionsHttps } from '../../../utils/firebase/firebase-admin';

interface Props {
  firestoreAdmin: FirestoreAdmin;
  subjectCategoryId: string;
}

export default async function getGenericSubjectsByCategory({
  firestoreAdmin,
  subjectCategoryId,
}: Props) {
  const categoryField: keyof GenericSubjectData = "relatedCategories";

  try {
    const genericSubjectsFilteredByCategory = await firestoreAdmin
      .collection(GENERIC_SUBJECT_COLLECTION_NAME)
      .where(categoryField, "array-contains", subjectCategoryId)
      .get();

    // process and return data
    return genericSubjectsFilteredByCategory.docs.map((doc) => {
      const data = doc.data();

      if (!isGenericSubjectData(data))
        throw new functionsHttps.HttpsError(
          "internal",
          `Some of the generic subject data is not valid`,
          JSON.stringify({ __filename }) // todo add this to error calls for easier tracking
        );

      return data;
    });
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading data from firestore",
      JSON.stringify({ __filename, error })
    );
  }
}
