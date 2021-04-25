import { FirestoreAdmin } from '../declarations/interfaces';
import readPrivateUserData from './readPrivateUserData';

interface Props<D, P> {
  dataPredicate: (data: any) => data is D;
  firestoreAdmin: FirestoreAdmin;
  path: string;
  publicDataExtractor: (data: any) => P;
}
// todo make controller automatically choose whether to use the private or public data if user id matches, just need to call a data extractor functionto get public data
export default async function readPublicUserData<D, P>(props: Props<D, P>) {
  const { publicDataExtractor } = props;

  const privateData = await readPrivateUserData(props);

  const extractedPublicData = publicDataExtractor(privateData);

  console.log(__filename, { privateData, extractedPublicData });

  return extractedPublicData;
}
