import * as functions from 'firebase-functions';

import {
  CallableFunctionName, CallableMethod, FirebaseCallableFunctionHandler,
} from './declarations/types';
import createTutorHandler from './request-handlers/createTutorHandler';
import firestoreWriteHandler from './request-handlers/firestoreWrite';
import getSubjectsByCategoryHandler from './request-handlers/getSubjectsByCategoryHandler';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
Example from https://firebase.google.com/docs/functions/callable#web
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
*/

const callableFunctionHandlers = {} as {
  [key in CallableFunctionName]: FirebaseCallableFunctionHandler;
};

callableFunctionHandlers.test = (data, context) => {
  return { message: "yay" };
  //   .region("europe-west1")
  // ...
};

callableFunctionHandlers.writeTest = firestoreWriteHandler;

callableFunctionHandlers.getSubjectsByCategory = getSubjectsByCategoryHandler;

callableFunctionHandlers.createTutor = createTutorHandler;

/*
module.exports = {
  ...callableFunctionHandlers,
} as {
  [key in CallableFunctionName]: CallableMethod;
};
*/

// export defined handlers with given callable function names
module.exports = Object.entries(callableFunctionHandlers).reduce(
  (exports, [callableName, callableHandler]) => {
    exports[callableName as CallableFunctionName] = functions.https.onCall(
      callableHandler
    );
    return exports;
  },
  {} as {
    [key in CallableFunctionName]: CallableMethod;
  }
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
