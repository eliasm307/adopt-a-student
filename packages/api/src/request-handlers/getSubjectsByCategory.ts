import {
  GetSubjectsByCategoryRequestBody, GetSubjectsByCategoryResponseBody,
} from '../../common/src';
import { FirebaseCallableFunctionHandler } from '../declarations/types';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import getGenericSubjectsByCategory from '../utils/getGenericSubjectsByCategory';
import getLocaleSubjectFromGenericSubject from '../utils/getLocaleSubjectFromGenericSubject';
import verifyRequest from '../utils/verifyRequest';

const getSubjectsByCategory: FirebaseCallableFunctionHandler<
  GetSubjectsByCategoryRequestBody,
  GetSubjectsByCategoryResponseBody
> = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.locale || !data.categoryId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects by category because provided data is missing locale or required subject category id"
    );

  const { categoryId: subjectCategoryId, locale } = data;

  const genericSubjectsByCategory = await getGenericSubjectsByCategory({
    firestore: firestoreAdmin,
    subjectCategoryId,
  });

  const localeSubjectPromises = genericSubjectsByCategory.map(
    (genericSubject) =>
      getLocaleSubjectFromGenericSubject({
        firestore: firestoreAdmin,
        genericSubject,
        locale,
      })
  );

  const localeSubjects = await Promise.all(localeSubjectPromises);

  const result: GetSubjectsByCategoryResponseBody = {
    data: genericSubjectsByCategory.map(
      ({ relatedSubjects, relatedCategories }, i) => ({
        relatedCategories,
        relatedSubjects,
        subject: localeSubjects[i],
      })
    ),
  };

  return result;
};

export default getSubjectsByCategory;
