import { HttpsFunction, Runnable } from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

import { CALLABLE_FUNCTION_NAMES } from '../constants';

export type FirebaseCallableFunctionHandler<D = any, R = any> = (
  data: Partial<D> | undefined,
  context: CallableContext
) => R | Promise<R>;

/** Defines the callable function names available */
export type CallableFunctionName = typeof CALLABLE_FUNCTION_NAMES[number];

/** Type of a callable function */
export type CallableMethod = HttpsFunction & Runnable<any>;

export type UserTypeName = "Student" | "Tutor";
