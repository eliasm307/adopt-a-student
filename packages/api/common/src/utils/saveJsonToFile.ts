interface Props {
  data: any;
  path: string;
}
import fs from 'fs-extra';
import path from 'path';

export default async function saveJsonToFile(props: Props) {
  const { data, path } = props;
  const fileExists = await fs.pathExists(path);

  if (fileExists)
    return console.warn(
      __filename,
      "Data already exists, if you want to regenerate it delete it before running this",
      { path }
    );

  // write file
  await fs.outputJSON(path, data, {
    spaces: 2,
    replacer: null,
  });

  console.log(__filename, `Data written to file ${path}`);
}
