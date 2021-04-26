import { CallableFunctionName } from "@adopt-a-student/common";
import { FirebaseFunctions } from ".";
import log from "../log";

interface Props<D> {
  data: D;
  functions: FirebaseFunctions;
  name: CallableFunctionName;
}

export default async function callFirebaseFunction<D = any, R = any>({
  data,
  functions,
  name,
}: Props<D>): Promise<R | null> {
  try {
    const result = await functions.httpsCallable(name as string)(data);
    log("callFirebaseFunction", `Call to callable ${name} successful`);
    return result.data as R;
  } catch (error) {
    console.error("callFirebaseFunction");
    return null;
  }
}
