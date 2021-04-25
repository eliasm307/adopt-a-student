import faker from 'faker';

import { promiseAllSettledAndLog } from '@adopt-a-student/common';

import createDocument, { CreateDocumentProps } from '../firebase/createDocument';
import newGuid from '../newGuid';

interface Props<D> extends Omit<CreateDocumentProps<D>, "data" | "documentId"> {
  numberToGenerate: number;
  userDataFactory: () => D;
}

const bulkUserPopulator = async <D>(props: Props<D>) => {
  const {
    numberToGenerate,
    collectionPath,
    dataPredicate,
    firestoreAdmin,
    userDataFactory,
  } = props;

  const promises: Promise<any>[] = [];

  for (let i = 0; i < numberToGenerate; i++) {
    const fakeUserData = userDataFactory();

    const fakeUserPromise = createDocument({
      collectionPath,
      documentId: newGuid(),
      data: fakeUserData,
      dataPredicate,
      firestoreAdmin,
    });

    promises.push(fakeUserPromise);

    console.log(__filename, "Fake user promise created", {
      // fakeUserData,
    });
  }

  const result = await promiseAllSettledAndLog(promises);

  return result;
};

export default bulkUserPopulator;
