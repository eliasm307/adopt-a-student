import {
  CreateSubjectCategoryRequestBody, CreateSubjectCategoryResponseBody, isGenericSubjectCategoryData,
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

  const { locale, name, data } = body;

  const subjectCategoryNameField: keyof GenericSubjectCategoryData = "name";

  // check if a subject with the given name already exists

  const existingSubjectCategoriesSnapshot = await firestoreAdmin
    .collection(SUBJECT_CATEGORY_COLLECTION_NAME)
    .where(subjectCategoryNameField, "==", name)
    .get();

  if (existingSubjectCategoriesSnapshot.docs.length) {
    console.warn(
      __filename,
      `Tried to create a subject with name ${name} however there is `
    );
  }

  const id = newGuid();
  // const data = { ...updates, id };

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
