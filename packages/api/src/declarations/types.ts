import { HttpsFunction, Runnable } from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

import {
  RelationshipController,
} from '../controllers/RelationshipController/RelationshipController';
import { StudentsController } from '../controllers/StudentController/StudentController';
import {
  SubjectCategoryController,
} from '../controllers/SubjectCategoryController/SubjectCategoryController';
import { SubjectsController } from '../controllers/SubjectController/SubjectController';
import { TutorsController } from '../controllers/TutorController/TutorController';

/** Api handler with auth */
export type FirebaseCallableFunctionHandler<D = any, R = any> = (
  body: Partial<D> | undefined,
  context: CallableContext
) => Promise<R>;

/** Internal api handler, doesnt require auth */
export type InternalHandler<D = any, R = any> = (props: D) => Promise<R>;

/** Defines the callable function names available, as defined by various controllers */
export type CallableFunctionName =
  | typeof StudentsController.callableNames[number]
  | typeof TutorsController.callableNames[number]
  | typeof SubjectsController.callableNames[number]
  | typeof SubjectCategoryController.callableNames[number]
  | typeof RelationshipController.callableNames[number];
// typeof CALLABLE_FUNCTION_NAMES[number];

/** Type of a callable function */
export type CallableMethod = HttpsFunction & Runnable<any>;

// export type UserTypeName = "Student" | "Tutor";

/**
 * An object with the same keys as a given object where the values can be functions to cause mutations
 * or null for no mutation
 */
export type DataMutatorMap<T> = {
  [key in keyof T]: null | ((newValue: any) => void);
};

export type DataUpdater<T> = (props: {
  updates: Partial<T>;
  existingData: T;
}) => T;
