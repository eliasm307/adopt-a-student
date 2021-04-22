import { LocaleCode } from '../../declarations/types';
import { localeCodes } from '../locales';

export default function isLocale(data: any): data is LocaleCode {
  const isString = typeof data === "string";
  const isKnownLocale = localeCodes.indexOf(data) !== -1;

  return isString && isKnownLocale;
}
