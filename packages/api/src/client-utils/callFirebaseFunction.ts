import { CallableFunctionName } from '../declarations/types';
import { FirebaseFunctions } from './firebase-client';

interface Props<D> {
  data: D;
  functions: FirebaseFunctions;
  name: CallableFunctionName;
}

export default async function callFirebaseFunction<D = any>({
  data,
  functions,
  name,
}: Props<D>) {
  return functions.httpsCallable(name)(data);
}
