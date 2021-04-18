import {
  GetSubjectsByCategoryRequestBody, GetSubjectsByCategoryResponseBody, SubjectOverview,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import { functionsHttps } from '../../../utils/firebase/firebase-admin';
import verifyRequest from '../../../utils/verifyRequest';
import getGenericSubjectsByCategory from '../utils/getGenericSubjectsByCategory';
import getLocaleSubjectFromGenericSubject from '../utils/getLocaleSubjectFromGenericSubject';

const getSubjectsByCategory: FirebaseCallableFunctionHandler<
  GetSubjectsByCategoryRequestBody,
  GetSubjectsByCategoryResponseBody
> = async (data, context) => {
  const { uid } = verifyRequest(data, context);

  // verify received data
  if (!data?.locale || !data.categoryId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects by category because provided data is missing locale or required subject category id"
    );

  const { categoryId: subjectCategoryId, locale } = data;

  const genericSubjectsByCategory = await getGenericSubjectsByCategory({
    firestoreAdmin,
    subjectCategoryId,
  });

  const localeSubjectPromises = genericSubjectsByCategory.map(
    (genericSubject) =>
      getLocaleSubjectFromGenericSubject({
        firestoreAdmin,
        genericSubject,
        locale,
      })
  );

  const localeSubjects = await Promise.all(localeSubjectPromises);

  const results = genericSubjectsByCategory.map(
    ({ relatedSubjects, relatedCategories }, i) =>
      ({
        relatedCategories,
        relatedSubjects,
        subject: localeSubjects[i],
      } as SubjectOverview)
  );

  return { results };
};

export default getSubjectsByCategory;
