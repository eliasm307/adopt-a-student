import { https as functionsHttps, HttpsFunction, Runnable } from 'firebase-functions';

import {
  RelationshipController,
} from './controllers/RelationshipController/RelationshipController';
import { StudentsController } from './controllers/StudentController/StudentController';
import {
  SubjectCategoryController,
} from './controllers/SubjectCategoryController/SubjectCategoryController';
import { SubjectsController } from './controllers/SubjectController/SubjectController';
import { TutorsController } from './controllers/TutorController/TutorController';
import app from './tsoa-docs/app';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
Example from https://firebase.google.com/docs/functions/callable#web
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
*/

type CallableName =
  | typeof StudentsController.callableNames[number]
  | typeof TutorsController.callableNames[number]
  | typeof SubjectsController.callableNames[number]
  | typeof SubjectCategoryController.callableNames[number];

// getStudentsBySubjects;
const callableFunctionHandlers = {
  // writeTest: firestoreWriteHandler,

  // tutors
  createTutor: TutorsController.createTutor,
  updateTutor: TutorsController.updateTutor,
  getTutor: TutorsController.getTutor,
  getTutorsBySubjects: TutorsController.getTutorsBySubjects,

  // students
  createStudent: StudentsController.createStudent,
  updateStudent: StudentsController.updateStudent,
  getStudent: StudentsController.getStudent,
  getStudentsBySubjects: StudentsController.getStudentsBySubjects,

  /**/
  // subjects
  createGenericSubject: SubjectsController.createGenericSubject,
  // updateGenericSubject,
  createLocaleSubject: SubjectsController.createLocaleSubject,
  updateLocaleSubject: SubjectsController.updateLocaleSubject,
  getSubject: SubjectsController.getSubject,
  getSubjectsByCategory: SubjectsController.getSubjectsByCategory,

  // subject categories
  getSubjectCategory: SubjectCategoryController.getSubjectCategory,
  getSubjectCategoriesForLocale:
    SubjectCategoryController.getSubjectCategoriesForLocale,
  createSubjectCategory: SubjectCategoryController.createSubjectCategory,
  updateSubjectCategory: SubjectCategoryController.updateSubjectCategory,

  // relationships
  linkSubjects: RelationshipController.linkSubjects,
  unlinkSubjects: RelationshipController.unlinkSubjects,

  linkSubjectAndSubjectCategory:
    RelationshipController.linkSubjectAndSubjectCategory,
  unlinkSubjectAndSubjectCategory:
    RelationshipController.unlinkSubjectAndSubjectCategory,

  linkStudentAndTutor: RelationshipController.linkStudentAndTutor,
  unlinkStudentAndTutor: RelationshipController.unlinkStudentAndTutor,

  linkTutorAndLocaleSubject: RelationshipController.linkTutorAndSubject,
  unlinkTutorAndLocaleSubject: RelationshipController.unlinkTutorAndSubject,

  linkStudentAndSubject: RelationshipController.linkStudentAndSubject,
  unlinkStudentAndSubject: RelationshipController.unlinkStudentAndSubject,
} as Record<CallableName, (body: any, context: any) => Promise<any>>;

// export defined handlers with given callable function names
module.exports = Object.entries(callableFunctionHandlers).reduce(
  (exports, [callableName, callableHandler]) => {
    if (callableHandler)
      exports[callableName] = functionsHttps.onCall(callableHandler);
    return exports;
  },
  {} as Record<string, HttpsFunction & Runnable<any>>
);

module.exports.docs = functionsHttps.onRequest(app);
