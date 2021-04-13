import { CallableContext } from "firebase-functions/lib/providers/https";

export type FirebaseCallableFunctionHandler<D = any, R = any> = (
  data: Partial<D>,
  context: CallableContext
) => R | Promise<R>;
