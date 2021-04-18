import { https as functionsHttps, HttpsFunction, Runnable } from 'firebase-functions';

import { ObjectMap } from '@adopt-a-student/common';

import linkGenericSubjectAndSubjectCategory from './controllers/RelationshipController/request-handlers/linkGenericSubjectAndSubjectCategory';
import unlinkGenericSubjectAndSubjectCategory from './controllers/RelationshipController/request-handlers/unlinkGenericSubjectAndSubjectCategory';
import { StudentsController } from './controllers/StudentController';
import createStudent from './controllers/StudentController/request-handlers/createStudent';
import getPrivateStudentData from './controllers/StudentController/request-handlers/getPrivateStudentData';
import getPublicStudentData from './controllers/StudentController/request-handlers/getPublicStudentDataHandler';
import updateLocaleSubject from './controllers/StudentController/request-handlers/updateLocaleSubject';
import updateStudent from './controllers/StudentController/request-handlers/updateStudent';
import createSubjectCategory from './controllers/SubjectCategoryController/request-handlers/createSubjectCategory';
import updateLocaleSubjectCategory from './controllers/SubjectCategoryController/request-handlers/updateLocaleSubjectCategory';
import createGenericSubject from './controllers/SubjectController/request-handlers/createGenericSubject';
import createLocaleSubject from './controllers/SubjectController/request-handlers/createLocaleSubject';
import getSubject from './controllers/SubjectController/request-handlers/getSubject';
import getSubjectsByCategory from './controllers/SubjectController/request-handlers/getSubjectsByCategory';
import createTutor from './controllers/TutorController/request-handlers/createTutor';
import getPrivateTutorData from './controllers/TutorController/request-handlers/getPrivateTutorDataHandler';
import getPublicTutorData from './controllers/TutorController/request-handlers/getPublicTutorDataHandler';
import getTutorsBySubjects from './controllers/TutorController/request-handlers/getTutorsBySubjectsHandler';
import updateTutor from './controllers/TutorController/request-handlers/updateTutor';
import { CallableFunctionName, FirebaseCallableFunctionHandler } from './declarations/types';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
Example from https://firebase.google.com/docs/functions/callable#web
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
*/
const callableFunctionHandlers = {
  // writeTest: firestoreWriteHandler,

  // tutors
  createTutor,
  updateTutor,
  getPrivateTutorData,
  getPublicTutorData,
  getTutorsBySubjects,

  // students
  createStudent,
  updateStudent,
  getPrivateStudentData,
  getPublicStudentData,
  getStudentsBySubjects: StudentsController.getStudentsBySubjects,

  // subjects
  createGenericSubject,
  // updateGenericSubject,
  createLocaleSubject,
  updateLocaleSubject,
  getSubject,
  getSubjectsByCategory,

  // subject categories
  getSubjectCategories,
  createSubjectCategory,
  updateLocaleSubjectCategory,

  // relationships
  linkGenericSubjects,
  unlinkGenericSubjects,

  linkGenericSubjectAndSubjectCategory,
  unlinkGenericSubjectAndSubjectCategory,

  linkStudentAndTutor,
  unlinkStudentAndTutor,

  linkTutorAndLocaleSubject,
  unlinkTutorAndLocaleSubject,

  linkStudentAndLocaleSubject,
  unlinkStudentAndLocaleSubject,
} as ObjectMap<CallableFunctionName, FirebaseCallableFunctionHandler>;

/*
callableFunctionHandlers.test = (data, context) => {
  return { message: "yay" };
  //   .region("europe-west1")
  // ...
};
*/

// export defined handlers with given callable function names
module.exports = Object.entries(callableFunctionHandlers).reduce(
  (exports, [callableName, callableHandler]) => {
    if (callableHandler)
      exports[callableName] = functionsHttps.onCall(callableHandler);
    return exports;
  },
  {} as ObjectMap<string, HttpsFunction & Runnable<any>>
);

// export default callableFunctions;

/** Get all student profile data */
// export const getStudent = functions.https.onCall(_getStudent);

/** Update student profile data */
// export const updateStudent = functions.https.onCall(_updateStudent);

/** Get all tutor profile data */
// export const getTutor = functions.https.onCall(_getTutor);

/** Update tutor profile data */
// export const updateTutor = functions.https.onCall(_updateTutor);

/** Get subject by id */
// export const getSubject = functions.https.onCall(_getSubject);

/** Update subject by id */
// export const updateSubject = functions.https.onCall(_updateSubject);

/** Get all subjects */
// export const getAllSubjects = functions.https.onCall(_getAllSubjects);

/** Get students interested in subjects */
// export const getStudentsBySubjects = functions.https.onCall(
//   _getStudentsBySubjects
// );

/** Get students interested in subjects */
// export const getTutorsBySubjects = functions.https.onCall(_getTutorsBySubjects);
