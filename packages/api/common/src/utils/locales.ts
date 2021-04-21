export {};

import locales from 'locale-codes';

import { LocaleCode } from '../declarations/types';

// define the available locale codes, keep this limited for the hackathon app
export const localeCodes = ["ms", "en", "fr", "pt"] as const;

export const getLocaleData = (locale: LocaleCode) => locales.getByTag(locale);

export const localeCountries: Record<LocaleCode, Set<string>> = {} as Record<
  LocaleCode,
  Set<string>
>;

const localeCodesSet = new Set(localeCodes);

const localesUsed = locales.all.filter((locale) =>
  localeCodesSet.has(locale["iso639-1"] as LocaleCode)
);

// populate countries set for each locale
localesUsed.forEach((locale) => {
  console.warn({ locale, localeCountries });

  if (locale.location) {
    if (!localeCountries[locale["iso639-1"] as LocaleCode])
      localeCountries[locale["iso639-1"] as LocaleCode] = new Set<string>();

    localeCountries[locale["iso639-1"] as LocaleCode].add(locale.location);
  }
});

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
