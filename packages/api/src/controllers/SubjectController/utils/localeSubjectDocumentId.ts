import { Country, LocaleCode } from '@adopt-a-student/common';

interface Props {
  country: Country;
  genericId: string;
  locale: LocaleCode;
}

export function isLocaleSubjectDocumentId(id: string): boolean {
  return id.split(`/`).length === 3;
}

export function createLocaleSubjectDocumentId({
  genericId,
  locale,
  country,
}: Props): string {
  return `${genericId}-${locale}-${country}`;
}

export function getGenericIdFromLocaleSubjectDocumentId(
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

export function getLocaleFromLocaleSubjectDocumentId(
  localeSubjectId: string
): string {
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

export function getCountryFromLocaleSubjectDocumentId(
  localeSubjectId: string
): string {
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
