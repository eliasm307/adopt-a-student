import { UserSubjectData } from '../..';

export function isLinkedLocaleSubjectData(data: any): data is UserSubjectData {
  if (typeof data !== "object") return false;

  const {
    id,
    locale,
    confidenceLevel,
    detail,
    country,
  } = data as UserSubjectData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: UserSubjectData = {
    id,
    locale,
    confidenceLevel,
    country,
    detail,
  };

  const hasId = typeof id === "string" && id;
  const hasLocale = typeof locale === "string" && locale;
  const hasCountry = typeof country === "string" && country;
  const hasConfidenceLevel = typeof confidenceLevel === "number";
  const hasDetail = typeof detail === "string";

  if (hasId && hasLocale && hasConfidenceLevel && hasDetail && hasCountry)
    return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
