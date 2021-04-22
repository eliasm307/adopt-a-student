import { isPrivateStudentData, isPrivateTutorData } from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../constants';
import { firestoreAdmin } from '../firebase/firebase-admin';
import bulkCreateSubjectsForAllLocales from './bulkCreateSubjectForAllLocales';
import bulkUserPopulator from './bulkUserPopulator';
import createFakeTutorData from './createFakeStudentData';
import createFakeStudentData from './createFakeTutorData';

describe("bulkUserPopulator", () => {
  it("Can bulk generate students", async () => {
    const results = await bulkUserPopulator({
      collectionPath: STUDENT_COLLECTION_NAME,
      dataPredicate: isPrivateStudentData,
      firestoreAdmin,
      numberToGenerate: 10,
      userDataFactory: createFakeStudentData,
    });

    console.log(__filename, "test result", { results });
  }, 9999);

  it("Can bulk generate tutors", async () => {
    const results = await bulkUserPopulator({
      collectionPath: TUTOR_COLLECTION_NAME,
      dataPredicate: isPrivateTutorData,
      firestoreAdmin,
      numberToGenerate: 10,
      userDataFactory: createFakeTutorData,
    });

    console.log(__filename, "test result", { results });
  }, 9999);
});

describe("bulkCreateSubjectsForAllLocales", () => {
  it("can generate multiple subjects and locale subjects", async () => {
    await expect(
      bulkCreateSubjectsForAllLocales({
        genericSubjectData: {
          names: ["Maths"],
          relatedCategories: [],
          relatedSubjects: [],
        },
      })
    ).resolves.toBeTruthy();
  }, 9999);
});
