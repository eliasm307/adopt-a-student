import { CallableFunctionName } from '../declarations/types';
import { FirebaseFunctions } from './firebase-client';

interface Props<D> {
  data: D;
  functions: FirebaseFunctions;
  name: CallableFunctionName;
}

export default async function callFirebaseFunction<D = any, R = any>({
  data,
  functions,
  name,
}: Props<D>) {
  return (await functions.httpsCallable(name)(data)).data as R;
}
