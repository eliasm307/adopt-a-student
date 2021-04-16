import { GenericSubjectCategoryData } from '@adopt-a-student/common';

import isLocaleSubjectCategoryData from './isLocaleSubjectCategoryData';

export default function isGenericSubjectCategoryData(
  data: any
): data is GenericSubjectCategoryData {
  if (typeof data !== "object") return false;

  const {
    id,
    localeSubjectCategories,
    genericSubjectIds,
  } = data as GenericSubjectCategoryData;

  const hasId = typeof id === "string" && id;

  const hasGenericSubjectIds = Array.isArray(genericSubjectIds);
  const hasLocaleSubjects = typeof localeSubjectCategories === "object";

  if (!(hasId && hasLocaleSubjects && hasGenericSubjectIds)) {
    console.warn(
      __filename,
      "Data is not valid, either doesnt have id or locale subjects",
      { data }
    );
    return false;
  }

  // ? check individual sub locale subjects?

  for (const id of genericSubjectIds) {
    if (typeof id !== "string") {
      console.warn(
        __filename,
        "Some of the provided generic subject ids are not strings",
        { data, genericSubjectIds }
      );
      return false;
    }
  }

  for (const [localeCode, localeSubjectCategory] of Object.entries(
    localeSubjectCategories
  )) {
    if (
      typeof localeSubjectCategory === "object" &&
      !isLocaleSubjectCategoryData(localeSubjectCategory)
    ) {
      console.warn(
        __filename,
        "Some of the provided locale subject categories are not in the right format",
        { data, localeCode, localeSubjectCategory }
      );
      return false;
    } else if (typeof localeSubjectCategory !== "undefined") {
      console.warn(
        __filename,
        `Some of the provided locale subject categories are in an unknown data format "${typeof localeSubjectCategory}"`,
        { data, localeCode, localeSubjectCategory }
      );
      return false;
    }
  }
  // ? check key count?

  return true;
}
