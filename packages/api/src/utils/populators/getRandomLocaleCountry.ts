import { LocaleCode, localeCountries, selectAnyArrayItem } from '@adopt-a-student/common';

export default function getRandomLocaleCountry(locale: LocaleCode) {
  const countries = [...localeCountries[locale]];
  return selectAnyArrayItem(countries);
}
