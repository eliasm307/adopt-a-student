import { LOCALE_SUBJECT_COLLECTION_NAME, SUBJECT_CATEGORY_COLLECTION_NAME } from '../constants';
import { ApiGetSubjectCategoriesHandler } from '../declarations/interfaces';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import getCollectionData from '../utils/getCollectionData';
import verifyRequest from '../utils/verifyRequest';

const getSubjectCategoriesHandler: ApiGetSubjectCategoriesHandler = async (
  data,
  context
) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.locale)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects because provided data is missing subject id"
    );

  const locale = data.locale;

  const subjectCategories = await getCollectionData({
    firestore,
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isSubjectCategoryData,
  });

  const subjectLocaleCategories = subjectCategories.map(callbackfn);

  return {
    data: { subjectCategories: subjectLocaleCategories },
  };
};

export default getSubjectCategoriesHandler;
