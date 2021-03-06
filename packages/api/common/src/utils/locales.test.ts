import fs from 'fs-extra';
import path from 'path';

import {
  countryLocales, localeCountries, localeEnglishNames, localeNativeNames, localesUsed,
} from './locales-internal';
import saveJsonToFile from './saveJsonToFile';

const basePath = "../data/locales";

// type Country = keyof typeof countriesJson;

describe("locales", () => {
  it("can save used locale data to a JSON file", async () => {
    const data = localesUsed;

    const usedLocalesFilePath = path.resolve(
      __dirname,
      basePath,
      "all-locale-data.json"
    );

    await saveJsonToFile({ data: data, path: usedLocalesFilePath });

    const output = await fs.readJSON(usedLocalesFilePath);

    expect(output).toEqual(data);
  });

  it("can save used countries by locale code to a JSON file", async () => {
    const data = localeCountries;

    const usedLocalesFilePath = path.resolve(
      __dirname,
      basePath,
      "locale-countries.json"
    );

    await saveJsonToFile({ data: data, path: usedLocalesFilePath });

    const output = await fs.readJSON(usedLocalesFilePath);

    expect(output).toEqual(data);
  });
  it("can save used  locale codes by country to a JSON file", async () => {
    const data = countryLocales;

    const usedLocalesFilePath = path.resolve(
      __dirname,
      basePath,
      "country-locales.json"
    );

    await saveJsonToFile({ data: data, path: usedLocalesFilePath });

    const output = await fs.readJSON(usedLocalesFilePath);

    expect(output).toEqual(data);
  });
  it("can save locale english names", async () => {
    const data = localeEnglishNames;

    const usedLocalesFilePath = path.resolve(
      __dirname,
      basePath,
      "locale-english-names.json"
    );

    await saveJsonToFile({ data: data, path: usedLocalesFilePath });

    const output = await fs.readJSON(usedLocalesFilePath);

    expect(output).toEqual(data);
  });
  it("can save locale native names", async () => {
    const data = localeNativeNames;

    const usedLocalesFilePath = path.resolve(
      __dirname,
      basePath,
      "locale-native-names.json"
    );

    await saveJsonToFile({ data: data, path: usedLocalesFilePath });

    const output = await fs.readJSON(usedLocalesFilePath);

    expect(output).toEqual(data);
  });
});
