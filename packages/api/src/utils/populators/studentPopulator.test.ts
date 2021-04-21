import { isPrivateStudentData } from '../../../common/src';
import { STUDENT_COLLECTION_NAME } from '../../constants';
import { firestoreAdmin } from '../firebase/firebase-admin';
import bulkUserPopulator from './bulkUserPopulator';
import createFakeStudentData from './createFakeTutorData';

describe("studentPopulator", () => {
  it("Can bulk generate students", async () => {
    const results = await bulkUserPopulator({
      collectionPath: STUDENT_COLLECTION_NAME,
      dataPredicate: isPrivateStudentData,
      firestoreAdmin,
      numberToGenerate: 10,
      userDataFactory: createFakeStudentData,
    });

    console.log(__filename, "test result", { results });
  });
});

export {};
