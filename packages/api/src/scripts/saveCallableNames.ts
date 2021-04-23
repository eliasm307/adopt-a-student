import fs from 'fs-extra';
import path from 'path';

import { CallableNames } from '../controllers';
import arrayToRecord from '../utils/arrayToRecord';

async function saveCallableNames(): Promise<void> {
  console.log(__filename, "Starting script");

  const pathToFile = path.resolve(
    __dirname,
    "../../common/src/data/api/callableFunctionNames.json"
  );

  const fileExists = await fs.pathExists(pathToFile);

  const names = arrayToRecord(CallableNames);

  if (fileExists) {
    console.log(__filename, "there is an existing file, removing it now");
    try {
      await fs.remove(pathToFile);
      console.log(__filename, "deleted file successfully");
    } catch (error) {
      return console.error(__filename, `error deleting file`, { pathToFile });
    }
  }
  try {
    await fs.outputJSON(pathToFile, names, { replacer: null, spaces: 2 });
    console.log(__filename, "Success");
  } catch (error) {
    console.error(__filename, `Error writing file`, { error });
  }
}

saveCallableNames().finally(() =>
  console.log(__filename, "Promise fullfilled")
);
