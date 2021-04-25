import fs from 'fs-extra';
import path from 'path';

async function task() {
  console.log(__filename, "Start");

  const pathToJsonFile = path.resolve(
    __dirname,
    "../data/locales/country-locales.json"
  );

  const pathToTsFile = path.resolve(
    __dirname,
    "../data/locales/country-locales_test.ts"
  );

  const fileExists = await fs.pathExists(pathToJsonFile);

  if (!fileExists) throw Error(`File not found at path ${pathToJsonFile}`);

  const data = await fs.readJSON(pathToJsonFile);

  console.log(__filename, `Read file, key count = ${Object.keys(data).length}`);

  const tsFile = `const val = ${JSON.stringify(data)}; export default val;`;

  // await fs.writeJSON(pathToTsFile, tsFile, { replacer: null, spaces: 2 });

  // write ts to file
  const file = fs.createWriteStream(pathToTsFile);

  file.write(
    `const val = ${JSON.stringify(data).replace("\\", "")}; export default val;`
  );

  file.end();
}

task().finally(() => console.log(__filename, "Promise fulfilled"));
