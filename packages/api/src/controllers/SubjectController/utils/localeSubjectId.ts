import { Country, LocaleCode } from '@adopt-a-student/common';

interface Props {
  country: Country;
  genericId: string;
  locale: LocaleCode;
}

export function createLocaleSubjectId({
  genericId,
  locale,
  country,
}: Props): string {
  return `${genericId}-${locale}-${country}`;
}

export function getGenericIdFromLocaleSubjectId(
  localeSubjectId: string
): string {
  return (
    localeSubjectId.split(`-`)[0] ||
    console.warn(__filename, "Locale subject id is not formatted correctly", {
      localeSubjectId,
    }) ||
    ""
  );
}

export function getLocaleFromLocaleSubjectId(localeSubjectId: string): string {
  return (
    localeSubjectId.split(`-`)[1] ||
    console.warn(
      __filename,
      "Locale subject id is not formatted correctly, missing locale section",
      {
        localeSubjectId,
      }
    ) ||
    ""
  );
}

export function getCountryFromLocaleSubjectId(localeSubjectId: string): string {
  return (
    localeSubjectId.split(`-`)[2] ||
    console.warn(
      __filename,
      "Locale subject id is not formatted correctly, missing country section",
      {
        localeSubjectId,
      }
    ) ||
    ""
  );
}
