import {
  CreateSubjectCategoryRequestBody, CreateSubjectCategoryResponseBody, GenericSubjectCategoryData,
  isGenericSubjectCategoryData, isLocaleSubjectCategoryData, LocaleCode, LocaleSubjectCategoryData,
} from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import newGuid from '../../../utils/newGuid';
import verifyRequest from '../../../utils/verifyRequest';

/** Initialises a generic subject with an initial locale, if a matching generic subject doesnt already exist */
const createSubjectCategory: InternalHandler<
  CreateSubjectCategoryRequestBody,
  CreateSubjectCategoryResponseBody
> = async (props) => {
  const { locale, name } = props;
  const genericId = newGuid();

  const localeCategoryData: LocaleSubjectCategoryData = {
    locale,
    name,
    id: genericId,
  };

  if (!isLocaleSubjectCategoryData(localeCategoryData))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      `Provided initial data is not valid`
    );

  const subjectCategoryNamesField: keyof GenericSubjectCategoryData = "names";

  // check if a subject category with the given name already exists,
  // if a generic subject category already exists with a given name,
  // this means this new subject belongs as a locale subject of that existing subject category
  const existingSubjectCategoriesSnapshot = await firestoreAdmin
    .collection(SUBJECT_CATEGORY_COLLECTION_NAME)
    .where(subjectCategoryNamesField, "array-contains", name)
    .get();

  if (existingSubjectCategoriesSnapshot.docs.length) {
    const error = `Tried to create a subject category with name ${String(
      name
    )} however there are ${
      existingSubjectCategoriesSnapshot.docs.length
    } existing subject categories with this name, try to edit existing subjects instead`;

    console.warn(__filename, error, { props });

    throw new functionsHttps.HttpsError("already-exists", error);
  }

  const data: GenericSubjectCategoryData = {
    locales: { [locale]: localeCategoryData } as Record<
      LocaleCode,
      LocaleSubjectCategoryData
    >,
    names: [name], // assign inital name
    relatedSubjects: [],
    id: genericId,
  };

  // create
  const result = await createDocument({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    id: genericId,
    data,
    dataPredicate: isGenericSubjectCategoryData,
    firestoreAdmin,
  });

  return { result } as CreateSubjectCategoryResponseBody;
};

export default createSubjectCategory;
