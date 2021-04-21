import { isPrivateStudentData } from '../../../common/src';
import { STUDENT_COLLECTION_NAME } from '../../constants';
import { firestoreAdmin } from '../firebase/firebase-admin';
import bulkUserPopulator from './bulkUserPopulator';
import createFakeStudentData from './createFakeTutorData';

describe("studentPopulator", () => {
  it("Can bulk generate students", () => {
    const results = bulkUserPopulator({
      collectionPath: STUDENT_COLLECTION_NAME,
      dataPredicate: isPrivateStudentData,
      firestoreAdmin,
      numberToGenerate: 2,
      userDataFactory: createFakeStudentData,
    });
  });
});

export {};
