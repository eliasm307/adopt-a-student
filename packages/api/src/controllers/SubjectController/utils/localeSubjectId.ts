import { LocaleCode } from '../../../../common/src';

interface Props {
  genericId: string;
  locale: LocaleCode;
}

export function createLocaleSubjectId({ genericId, locale }: Props): string {
  return `${genericId}-${locale}`;
}

export function getGenericIdFromLocaleSubjectId(
  localeSubjectId: string
): string {
  return localeSubjectId.split(`-`)[0];
}

export function getLocaleFromLocaleSubjectId(localeSubjectId: string): string {
  return localeSubjectId.split(`-`)[1];
}
