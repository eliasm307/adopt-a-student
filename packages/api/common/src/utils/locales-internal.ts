import locales from 'locale-codes';

import { localeCodes } from '../constants';
import { LocaleCode } from '../declarations/types';

// export const getLocaleData = (locale: LocaleCode) => locales.getByTag(locale);

const localeCountriesSet: Record<LocaleCode, Set<string>> = {} as Record<
  LocaleCode,
  Set<string>
>;

const countryLocalesSet: Record<string, Set<LocaleCode>> = {} as Record<
  string,
  Set<LocaleCode>
>;
const localeEnglishNamesSet: Record<string, Set<string>> = {} as Record<
  string,
  Set<string>
>;
const localeNativeNamesSet: Record<string, Set<string>> = {} as Record<
  string,
  Set<string>
>;

const setToRecord = (set: Set<string>) => {
  return [...set].reduce((out, val) => {
    return { ...out, [val]: val };
  }, {} as Record<string, string>);
};

const setRecordToObjectRecord = (record: Record<string, Set<string>>) => {
  return Object.entries(record).reduce((a, [key, value]) => {
    return { ...a, [key]: setToRecord(value) };
  }, {} as Record<string, Record<string, string>>);
};

// export const countries = new Set<string>();

const localeCodesSet = new Set(localeCodes);

// todo extract these into a local file, so the whole locale-codes package doesnt need to be imported/exported
export const localesUsed = locales.all.filter((locale) =>
  localeCodesSet.has(locale["iso639-1"] as LocaleCode)
);

// populate countries set for each locale
localesUsed.forEach((locale) => {
  // console.warn({ locale, localeCountries });

  if (locale.location) {
    // populate locale countries
    if (!localeCountriesSet[locale["iso639-1"] as LocaleCode])
      localeCountriesSet[locale["iso639-1"] as LocaleCode] = new Set<string>();

    localeCountriesSet[locale["iso639-1"] as LocaleCode].add(locale.location);

    // populate country locales
    if (!countryLocalesSet[locale.location])
      countryLocalesSet[locale.location] = new Set<LocaleCode>();

    countryLocalesSet[locale.location].add(locale["iso639-1"] as LocaleCode);

    // record country
    // countries.add(locale.location);
  }
  if (locale.name) {
    // record english name
    if (!localeEnglishNamesSet[locale["iso639-1"] as LocaleCode])
      localeEnglishNamesSet[
        locale["iso639-1"] as LocaleCode
      ] = new Set<string>();

    localeEnglishNamesSet[locale["iso639-1"] as LocaleCode].add(locale.name);
  }
  if (locale.local) {
    // record native name
    if (!localeNativeNamesSet[locale["iso639-1"] as LocaleCode])
      localeNativeNamesSet[
        locale["iso639-1"] as LocaleCode
      ] = new Set<string>();

    localeNativeNamesSet[locale["iso639-1"] as LocaleCode].add(locale.local);
  }
});

const localeCountries = setRecordToObjectRecord(localeCountriesSet);
const countryLocales = setRecordToObjectRecord(countryLocalesSet);
const localeEnglishNames = setRecordToObjectRecord(localeEnglishNamesSet);
const localeNativeNames = setRecordToObjectRecord(localeNativeNamesSet);

export {
  localeCountries,
  countryLocales,
  localeEnglishNames,
  localeNativeNames,
};
/*
console.log(__filename, "Resulting locale data", {
  localeCountries,
});
*/
// todo implement this such that any required locale information is exported
/*

import { LocaleCode } from '../declarations/types';
import locales from 'locale-codes'
import locales from 'locale-codes';

import { LocaleCode } from '../declarations/types';

type CountryEnglishName = string;

type CountryNativeName = string;

type LanguageEnglishName  = string

type LanguageNativeName = string

// todo finalise this

interface CountryData {
  loca
  les: LocaleCode[]
  name
  English: CountryEnglishName,
  name
  Native: CountryNativeName
}

interface LanguageData {
  engl
  ishName: LanguageEnglishName,
  nati
  veName: LanguageNativeName
}

interface LocaleData {
  countries: CountryEnglishName[]
  localeCode: LocaleCode;
}

 export const countryData :Record<CountryEnglishName,CountryData >= {};

 /** identified by ISO 639-1 ID */
/*
 export const localeData: Record<LocaleCode,LocaleData> = {}

 data.map(({location}) =>  {
   location && countries.add(location)
}) ;

data
  .map((locale) => locale["iso639-1"] || locale.)
  .filter((data) => typeof data === "string") as string[];

export const languageNameEnglish = data
  .map((locale) => locale.name)
  .filter((data) => typeof data === "string");

export const languageNameNative = data
  .map((locale) => locale.local)
  .filter((data) => typeof data === "string") as string[];

type LocaleCountries = typeof countries[number];

*/
