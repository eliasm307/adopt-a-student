import { CallableFunctionName } from "@adopt-a-student/common";
import { FirebaseFunctions } from ".";
import log, { Logger } from "../log";

interface Props<D> {
  data: D;
  functions: FirebaseFunctions;
  name: CallableFunctionName;
}

const logger = new Logger("callFirebaseFunction");

export default async function callFirebaseFunction<D = any, R = any>({
  data,
  functions,
  name,
}: Props<D>): Promise<R | null> {
  try {
    logger.log(`Calling ${name}...`);
    const result = await functions.httpsCallable(name as string)(data);
    logger.log(`Call to callable ${name} successful`);
    return result.data as R;
  } catch (error) {
    logger.error(`Error while calling ${name}`, { error });
    return null;
  }
}
