import { ApiGetSubjectsByCategory } from '../declarations/interfaces';
import { firestore, functionsHttps } from '../utils/firebase/firebase-admin';
import getGenericSubjectsByCategory from '../utils/getGenericSubjectsByCategory';
import getLocaleSubjectFromGenericSubject from '../utils/getLocaleSubjectFromGenericSubject';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiGetSubjectsByCategory = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.locale || !data.subjectCategoryId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects by category because provided data is missing locale or required subject category id"
    );

  const subjectCategoryId = data.subjectCategoryId;
  const locale = data.locale;

  const genericSubjectsByCategory = await getGenericSubjectsByCategory({
    firestore,
    subjectCategoryId,
  });

  const localeSubjectPromises = genericSubjectsByCategory.map(
    (genericSubject) =>
      getLocaleSubjectFromGenericSubject({
        firestore,
        genericSubject,
        locale,
      })
  );

  const localeSubjects = await Promise.all(localeSubjectPromises);

  return {
    data: genericSubjectsByCategory.map((genericSubject, i) => ({
      genericSubject,
      localeSubject: localeSubjects[i],
    })),
  };
};

export default handler;
