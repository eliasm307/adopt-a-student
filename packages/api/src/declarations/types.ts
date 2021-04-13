import { CallableContext } from "firebase-functions/lib/providers/https";

export type CallableFunctionHandler = (
  data: any,
  context: CallableContext
) => any | Promise<any>;
