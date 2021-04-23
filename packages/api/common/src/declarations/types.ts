import { localeCodes } from '../constants';
import countryLocales from '../data/locales/country-locales.json';
import { CallableFunctionNames } from './api';

/** A locale code to specify language e.g. en for English */
export type LocaleCode = typeof localeCodes[number]; // todo add more

/** A country name e.g. "Malaysia" */
export type Country = keyof typeof countryLocales;

/** Defines the callable function names available */
export type CallableFunctionName = keyof typeof CallableFunctionNames;
/*
export type Country = "United Kingdom" | "Brazil" | "Cote d'Ivoire" | string;
*/

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
// export type LocaleSubjectId = string;

/** A general subject id that doesnt specify locale or country */
export type SubjectId = string;

/** Any subject id */
// export type SubjectId = GenericSubjectId | LocaleSubjectId;

/** A tutor user id */
export type TutorId = string;

/** A student user id */
export type StudentId = string;

/** A general user id, ie a student or tutor id */
export type UserId = TutorId | StudentId;

/** A generic subject category id */
export type SubjectCategoryId = string;

/** A subject cateogory id which specifies a locale */
// export type LocaleSubjectCategoryId = string;

/** A general category name which doesnt specify locale */
export type CategoryId = string;

/** Name of a subject in a specific locale */
export type SubjectName = string;

/** Name of a subject cateogry in a specific locale */
export type SubjectCategoryName = string;
