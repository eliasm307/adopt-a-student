import {
  GetSubjectsByCategoryRequestBody, GetSubjectsByCategoryResponseBody, SubjectOverview,
} from '@adopt-a-student/common';

import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import verifyRequest from '../../../utils/verifyRequest';
import getGenericSubjectsByCategory from '../utils/getGenericSubjectsByCategory';
import getLocaleSubjectFromGenericSubject from '../utils/getLocaleSubjectFromGenericSubject';

const getSubjectsByCategory: InternalHandler<
  GetSubjectsByCategoryRequestBody,
  GetSubjectsByCategoryResponseBody
> = async (props) => {
  const { categoryId: subjectCategoryId, locale, country } = props;

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
        country,
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
