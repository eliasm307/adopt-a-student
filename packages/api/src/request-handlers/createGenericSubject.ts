import { GENERIC_SUBJECT_COLLECTION_NAME } from '../constants';
import { ApiCreateGenericSubjectHandler } from '../declarations/interfaces';
import createDocument from '../utils/createDocument';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import newGuid from '../utils/newGuid';
import isGenericSubjectData from '../utils/type-predicates/isGenericSubjectData';
import verifyRequest from '../utils/verifyRequest';

const createGenericSubject: ApiCreateGenericSubjectHandler = async (
  body,
  context
) => {
  const auth = verifyRequest(body, context);

  const id = newGuid();

  if (!body?.data)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Data not provided"
    );

  const data = { ...body.data, id };

  const genericSubject = await createDocument({
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    id,
    data,
    dataPredicate: isGenericSubjectData,
    firestore,
  });

  return {
    data: { genericSubject },
  };
};

export default createGenericSubject;
