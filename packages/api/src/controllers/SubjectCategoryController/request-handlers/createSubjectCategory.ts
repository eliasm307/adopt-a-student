import { GenericSubjectCategoryData, isGenericSubjectCategoryData } from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import newGuid from '../../../utils/newGuid';
import verifyRequest from '../../../utils/verifyRequest';

export interface CreateSubjectCategoryRequestBody {
  updates: Partial<Omit<GenericSubjectCategoryData, "id">>;
}
export interface CreateSubjectCategoryResponseBody {
  result: GenericSubjectCategoryData;
}

const createSubjectCategory: FirebaseCallableFunctionHandler<
  CreateSubjectCategoryRequestBody,
  CreateSubjectCategoryResponseBody
> = async (body, context) => {
  const auth = verifyRequest(body, context);

  if (!body?.updates)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Data not provided"
    );

  const { updates } = body;

  const id = newGuid();
  const data = { ...updates, id };

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
