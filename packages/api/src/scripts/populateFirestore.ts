import { isPrivateStudentData, isPrivateTutorData } from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../constants';
import { firestoreAdmin } from '../utils/firebase/firebase-admin';
import bulkCreateSubjectsForAllLocales from '../utils/populators/bulkCreateSubjectForAllLocales';
import bulkUserPopulator from '../utils/populators/bulkUserPopulator';
import createFakeStudentData from '../utils/populators/createFakeStudentData';
import createFakeTutorData from '../utils/populators/createFakeTutorData';

const task = async () => {
  console.log(__filename, "start");

  // ? use promise all?

  // generate students
  const students = await bulkUserPopulator({
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    firestoreAdmin,
    numberToGenerate: 100,
    userDataFactory: createFakeStudentData,
  });

  console.log(__filename, "students result", {
    resultsCount: students.length,
    students,
  });

  // generate tutors
  const tutors = await bulkUserPopulator({
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    firestoreAdmin,
    numberToGenerate: 100,
    userDataFactory: createFakeTutorData,
  });

  console.log(__filename, "tutors result", {
    resultsCount: tutors.length,
    tutors,
  });

  const SUBJECTS_EN = [
    "Maths",
    "English",
    "Chemistry",
    "French",
    "Physics",
    "Biology",
    "German",
  ];

  const subjectPromises = SUBJECTS_EN.map((subject) =>
    bulkCreateSubjectsForAllLocales({
      genericSubjectData: {
        names: [subject], // todo move this to constants file
        relatedCategories: [],
        relatedSubjects: [],
      },
    })
  );

  // generate subjects
  const subjectResults = await Promise.allSettled(subjectPromises);

  console.log(__filename, { subjectResults });
};

task().finally(() => console.log(__filename, "promise fulfilled"));
