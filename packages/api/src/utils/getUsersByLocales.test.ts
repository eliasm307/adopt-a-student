import { TUTOR_COLLECTION_NAME } from '../constants';
import extractPublicTutorData from '../controllers/TutorController/request-handlers/utils/extractPublicTutorData';
import { firestoreAdmin } from './firebase/firebase-admin';
import getUsersByLocales from './getUsersByLocales';

describe("getUsersByLocales", () => {
  it("can get tutors by locales", async () => {
    expect.assertions(2);

    const result = await getUsersByLocales({
      countries: ["World"],
      firestoreAdmin,
      locales: ["en", "fr"],
      publicDataExtractor: extractPublicTutorData,
      userCollectionName: TUTOR_COLLECTION_NAME,
    });

    console.log(__filename, { resultCount: result.length, result });

    expect(result).toBeTruthy();
    expect(result?.length).toBeGreaterThan(0);
  }, 19999);
});
