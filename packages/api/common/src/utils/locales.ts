import countryLocalesJson from '../data/locales/country-locales.json';
import localeCountriesJson from '../data/locales/locale-countries.json';
import localeEnglishNamesJson from '../data/locales/locale-english-names.json';
import localeNativeNamesJson from '../data/locales/locale-native-names.json';
import { Country, LocaleCode } from '../declarations/types';

// const countriesArray = Object.keys(countryLocales) as Country[];

const countryLocales = countryLocalesJson as Record<
  Country,
  Record<LocaleCode, LocaleCode>
>;
const countryNames = [...new Set(Object.keys(countryLocales))] as Country[];
const localeCountriesAsMapObjects = localeCountriesJson as Record<
  LocaleCode,
  Record<Country, Country>
>;
const localeEnglishNames = localeEnglishNamesJson as Record<
  LocaleCode,
  Record<string, string>
>;
// todo fix this, some names are not coming up e.g. french native name francais
const localeNativeNames = localeNativeNamesJson as Record<
  LocaleCode | string,
  Record<string, string> | undefined
>;

export {
  countryLocales,
  countryNames,
  localeCountriesAsMapObjects as localeCountries,
  localeEnglishNames,
  localeNativeNames,
};
