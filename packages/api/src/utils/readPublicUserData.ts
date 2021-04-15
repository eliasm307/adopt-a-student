import { FirestoreAdmin } from '../declarations/interfaces';
import { functionsHttps } from './firebase-admin';
import readPrivateUserData from './readPrivateUserData';

interface Props<D, P> {
  dataPredicate: (data: any) => data is D;
  firestore: FirestoreAdmin;
  path: string;
  publicDataExtractor: (data: any) => P;
}

export default async function readPublicUserData<D, P>(props: Props<D, P>) {
  const { publicDataExtractor } = props;

  const data = await readPrivateUserData(props);

  return publicDataExtractor(data);
}
