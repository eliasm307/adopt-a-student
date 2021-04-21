import { LocaleCode } from '../../../common/src';
import { localeCountries } from '../../../common/src/utils/locales';

export default function getRandomLocaleCountry(locale: LocaleCode) {
  const countries = [...localeCountries[locale]]
  return countries.;
}
