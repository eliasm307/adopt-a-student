import { localeCodes } from '../utils/locales';

/** A locale code to specify language e.g. en for English */
export type LocaleCode = typeof localeCodes[number]; // todo add more

/** A country name e.g. "Malaysia" */
export type Country = "United Kingdom" | "Brazil" | "Cote d'Ivoire" | string; // todo add more

// ? use Record type instead?
/*
export type ObjectMap<K extends string | number, V> = {
  [key in K]: V | undefined;
};
*/

/** A valid email address */
export type EmailString = string;

/** An internet link */
export type UrlString = string;

/** A subject id that specifies locale and country */
export type LocaleSubjectId = string;

/** A general subject id that doesnt specify locale or country */
export type GenericSubjectId = string;

/** Any subject id */
export type SubjectId = GenericSubjectId | LocaleSubjectId;

/** A tutor user id */
export type TutorId = string;

/** A student user id */
export type StudentId = string;

/** A general user id, ie a student or tutor id */
export type UserId = TutorId | StudentId;

/** A generic subject category id */
export type SubjectCategoryId = string;

/** A subject cateogory id which specifies a locale */
export type LocaleSubjectCategoryId = string;

/** A general category name which doesnt specify locale */
export type CategoryId = string;
