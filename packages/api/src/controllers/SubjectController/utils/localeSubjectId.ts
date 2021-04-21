interface Props {
  genericId: string;
  id: string;
}

export function createLocaleSubjectId({ genericId, id }: Props): string {
  return `${genericId}-${id}`;
}

export function getGenericIdFromLocaleSubjectId(
  localeSubjectId: string
): string {
  return localeSubjectId.split(`-`)[0];
}

export function getLocaleFromLocaleSubjectId(localeSubjectId: string): string {
  return localeSubjectId.split(`-`)[1];
}
