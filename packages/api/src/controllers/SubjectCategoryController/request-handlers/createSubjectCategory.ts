import { isGenericSubjectCategoryData } from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { ApiCreateSubjectCategoryHandler } from '../../../declarations/interfaces';
import createDocument from '../../../utils/firebase/createDocument';
import { functionsHttps } from '../../../utils/firebase/firebase-admin';
import newGuid from '../../../utils/newGuid';
import verifyRequest from '../../../utils/verifyRequest';

const createSubjectCategory: ApiCreateSubjectCategoryHandler = async (
  body,
  context
) => {
  const auth = verifyRequest(body, context);

  if (!body?.data)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Data not provided"
    );

  const id = newGuid();
  const data = { ...body.data, id };

  const genericSubjectCategory = await createDocument({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    id,
    data,
    dataPredicate: isGenericSubjectCategoryData,
    FirestoreAdmin,
  });

  return {
    data: { genericSubjectCategory },
  };
};

export default createSubjectCategory;