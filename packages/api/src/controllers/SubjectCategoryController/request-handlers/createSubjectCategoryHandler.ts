import {
  CreateSubjectCategoryRequestBody, CreateSubjectCategoryResponseBody, GenericSubjectCategoryData,
  isGenericSubjectCategoryData, isLocaleSubjectCategoryData, LocaleCode, LocaleSubjectCategoryData,
} from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import newGuid from '../../../utils/newGuid';
import verifyRequest from '../../../utils/verifyRequest';

/** Initialises a generic subject with an initial locale, if a matching generic subject doesnt already exist */
const createSubjectCategory: FirebaseCallableFunctionHandler<
  CreateSubjectCategoryRequestBody,
  CreateSubjectCategoryResponseBody
> = async (body, context) => {
  const auth = verifyRequest(body, context);

  if (!body?.locale || !body?.name)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Data not provided"
    );

  const { locale, name, data: inputData } = body;

  const id = newGuid();

  const localeCategoryData: LocaleSubjectCategoryData = {
    ...(inputData as LocaleSubjectCategoryData),
    parentId: id,
  };

  if (!isLocaleSubjectCategoryData(localeCategoryData))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      `Provided initial data is not valid`
    );

  const subjectCategoryNamesField: keyof GenericSubjectCategoryData = "names";

  // check if a subject with the given name already exists,
  // if a generic subject already exists with a given name,
  // this means this new subject belongs as a locale subject of that existing subject category
  const existingSubjectCategoriesSnapshot = await firestoreAdmin
    .collection(SUBJECT_CATEGORY_COLLECTION_NAME)
    .where(subjectCategoryNamesField, "array-contains", name)
    .get();

  if (existingSubjectCategoriesSnapshot.docs.length) {
    const error = `Tried to create a subject with name ${String(
      name
    )} however there is ${
      existingSubjectCategoriesSnapshot.docs.length
    } existing subjects with this name, try to edit existing subjects instead`;

    console.warn(__filename, error, { body });

    throw new functionsHttps.HttpsError("already-exists", error);
  }

  const data: GenericSubjectCategoryData = {
    locales: { [locale]: localeCategoryData } as Record<
      LocaleCode,
      LocaleSubjectCategoryData
    >,
    names: [name], // assign inital name
    relatedSubjects: [],
    id,
  };

  // create
  const result = await createDocument({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    id,
    data,
    dataPredicate: isGenericSubjectCategoryData,
    firestoreAdmin,
  });

  return { result } as CreateSubjectCategoryResponseBody;
};

export default createSubjectCategory;
