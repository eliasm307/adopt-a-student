import { LocaleCode } from '../../../common/src';
import { localeCountries } from '../../../common/src/utils/locales';
import selectAnyArrayItem from '../../../common/src/utils/selectAnyArrayItem';

export default function getRandomLocaleCountry(locale: LocaleCode) {
  const countries = [...localeCountries[locale]];
  return selectAnyArrayItem(countries);
}
