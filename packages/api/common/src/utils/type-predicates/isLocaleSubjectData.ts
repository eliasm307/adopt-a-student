import { LocaleSubjectData } from '../..';

export function isLocaleSubjectData(data: any): data is LocaleSubjectData {
  if (typeof data !== "object") return false;

  const {
    id,
    country,
    relatedTutors,
    description,
    name,
    locale,
    relatedStudents,
  } = data as LocaleSubjectData;

  // this is to ensure that if the schema changes, ie props are added/removed,
  // ts will throw an error to update the predicate as this object will be invalid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const forTsError: LocaleSubjectData = {
    id,
    country,
    relatedTutors,
    description,
    name,
    locale,
    relatedStudents,
  };

  const hasId = typeof id === "string" && id;
  const hasName = typeof name === "string" && name;
  const hasLocale = typeof locale === "string" && locale;
  const hasDescription = typeof description === "string";
  const hasCountry = typeof country === "string";
  const hasStudentIds = Array.isArray(relatedStudents);
  const hasTutorIds = Array.isArray(relatedTutors);

  if (!hasId)
    return Boolean(
      console.warn(__filename, "Data is not valid because of id", { data })
    );
  if (!hasStudentIds)
    return Boolean(
      console.warn(__filename, "Data is not valid because of student ids", {
        data,
      })
    );
  if (!hasTutorIds)
    return Boolean(
      console.warn(__filename, "Data is not valid because of tutor ids", {
        data,
      })
    );
  if (!hasLocale)
    return Boolean(
      console.warn(__filename, "Data is not valid because of locale", { data })
    );
  if (!hasName)
    return Boolean(
      console.warn(
        __filename,
        "Data is not valid because of generic subject id",
        { data }
      )
    );
  if (!hasDescription)
    return Boolean(
      console.warn(__filename, "Data is not valid because of description", {
        data,
      })
    );
  if (!hasCountry)
    return Boolean(
      console.warn(__filename, "Data is not valid because of country", { data })
    );

  return true;

  // ? check key count?

  console.warn(__filename, "Data is not valid", { data });
  return false;
}
