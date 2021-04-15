import * as functions from 'firebase-functions';

import { CallableFunctionName, CallableMethod } from './declarations/types';
import firestoreWriteHandler from './request-handlers/firestoreWrite';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
Example from https://firebase.google.com/docs/functions/callable#web
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
*/

const callableFunctions = {} as {
  [key in CallableFunctionName]: CallableMethod | undefined;
};

callableFunctions.test = functions.https.onCall((data, context) => {
  return { message: "yay" };
  //   .region("europe-west1")
  // ...
});

callableFunctions.writeTest = functions.https.onCall(firestoreWriteHandler);

callableFunctions.getSubjectsByCategory = functions.https.onCall();

module.exports = { ...callableFunctions } as {
  [key in CallableFunctionName]: CallableMethod;
};

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
