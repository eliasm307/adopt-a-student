import { LinkedLocaleSubjectData } from '@adopt-a-student/common';

export default function isLinkedLocaleSubjectData(
  data: any
): data is LinkedLocaleSubjectData {
  if (typeof data !== "object") return false;

  const {
    id,
    locale,
    confidenceLevel,
    detail,
  } = data as LinkedLocaleSubjectData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: LinkedLocaleSubjectData = {
    id,
    locale,
    confidenceLevel,
    detail,
  };

  const hasId = typeof id === "string" && id;
  const hasLocale = typeof locale === "string" && locale;
  const hasConfidenceLevel = typeof confidenceLevel === "number";
  const hasDetail = typeof detail === "string";

  if (hasId && hasLocale && hasConfidenceLevel && hasDetail) return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
