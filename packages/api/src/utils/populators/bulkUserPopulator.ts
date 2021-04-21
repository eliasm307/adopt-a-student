import faker from 'faker';

import promiseAllSettledAndLog from '../../../common/src/utils/promiseAllSettledAndLog';
import createDocument, { CreateDocumentProps } from '../firebase/createDocument';
import newGuid from '../newGuid';

interface Props<D> extends Omit<CreateDocumentProps<D>, "data" | "id"> {
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
      id: newGuid(),
      data: fakeUserData,
      dataPredicate,
      firestoreAdmin,
    });

    promises.push(fakeUserPromise);

    console.log(__filename, "Fake user promise created", {
      fakeUserData,
    });
  }

  return promiseAllSettledAndLog(promises);
};

export default bulkUserPopulator;
