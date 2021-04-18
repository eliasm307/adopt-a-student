import {
  GetSubjectsByCategoryRequestBody, GetSubjectsByCategoryResponseBody, SubjectOverview,
} from '@adopt-a-student/common';

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
