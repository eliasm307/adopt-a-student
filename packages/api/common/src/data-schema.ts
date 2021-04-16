import { ConfidenceLevelEnum } from './enums';
import { Country, LocaleCode, ObjectMap } from './types';

export interface Entity {
  // dataIsComplete: boolean;
}

/** User data that is publicly available */
export interface PublicUserData extends Entity {
  /** Unique id for a user */
  readonly id: string;

  /** Link to profile image, if defined */
  imageUrl?: string;
  /** Optional text for users to introduce themselves,
   * describe their experience, what subjects they are interested in etc */
  introduction?: string;
  /** The locales a user prefers for content */
  prefferedLocales: string[];
  /** Username which will be displayed for a user */
  userName: string;

// todo add reviews
}

/** Private user data only available to the owner user */
export interface PrivateUserData extends PublicUserData {
  /** Email to allow users to start communicating */
  email: string;
  /** Links to subjects a user is interested in learning/teaching (depends on type of user)
   * and user specific information about the user relating to a specific subject
   */
  linkedLocaleSubjects: LinkedLocaleSubjectData[];
}

/** Schema of data that represents a student, as it is stored in database */
export interface PrivateStudentData extends PrivateUserData {
  /** Data about the tutors a student is involved with */
  linkedTutors: LinkedTutorData[];
}

export interface PublicStudentData extends PublicUserData {}

/** Schema of data that represents a tutor, only available to the tutor */
export interface PrivateTutorData extends PrivateUserData {
  /** Data about the students a teacher is involved with */
  linkedStudents: LinkedStudentData[];
}

export interface PublicTutorData extends PublicUserData {
  /** Represents whether a tutor is available to take on a student */
  available: boolean;
}

/** Data about a subject specific to a user, as it is stored in database
 * // ? should this be public?
 */
export interface LinkedLocaleSubjectData {
  /** Unique id to the related subject */
  readonly id: string;

  /** A rating of how confident a user feels in the subject, the numbers  */
  confidenceLevel: ConfidenceLevelEnum;
  /** Detail of the users experience with the subject */
  detail: string;
  locale: LocaleCode;
}

/**
 * Represents a subject in every language, ie not dependent on locale.
 * This is used to map high level relationships between subjects e.g.
 * the "Maths" generic subject could be related to the "Physics" generic subject
 * where "Physics" and "Physiques" both belong to the "Physics" generic subject
 */
export interface GenericSubjectData extends Entity {
  readonly id: string;

  /** The categories this generic subject belongs to */
  categoryIds: string[];
  /** Links to other relevant subjects a user might be interested in
   `// todo needs to be syncronised ie if A is related to B then B must be related to A`
  */
  linkedGenericSubjectIds: string[];
}

/** Name of a subject category in a specific locale */
export interface SubjectLocaleName {
  locale: LocaleCode;
  name: string;
}

/** Subject category data in a specific locale */
export interface LocaleSubjectCategoryData {
  locale: LocaleCode;
  name: string;
  /** id of the generic subject, NOT the locale subject, the locale differentiates different locale subjects, that belong to one generic subject */
  parentId: string;
}

/** Subject category with all locale names */
export interface GenericSubjectCategoryData extends Entity {
  id: string;
  /** generic subjects which belong to this generic category
     // todo this should link category to subject and subject to category
  */
  linkedGenericSubjectIds: string[];
  /** Representations of the same generic subject catories in different locales */
  localeSubjectCategories: ObjectMap<LocaleCode, LocaleSubjectCategoryData>;
}

/** Schema of the general public data (not relating to a user) that represents a specific locale dependent subject,
 * as it is stored in database. e.g. "Physics" and "Physiques" are two different LocaleSubjects
 // ! this is represented as separate documents as there might be a lot of data associated with locale subjects, so this prevents every locale subject being loaded when querying generic subjects
*/
export interface LocaleSubjectData extends Entity {
  /** Unique id */
  readonly id: string;

  /** Specific country for this subject, for any subjects that might be country dependent, blank means it applies to any */
  country: Country;
  /** Description of the subject */
  description: string;
  /** Ids of students needing help with this subject `// todo needs to be syncronised` */
  linkedStudentIds: string[];
  /** Ids of tutors available to help with this subject `// todo needs to be syncronised` */
  linkedTutorIds: string[];
  /** Represents a language that a subject is in */
  locale: LocaleCode;
  /** Id of generic subject this locale subject relates to, there should only be 1 */
  parentId: string;
}

/** Data about a tutor from the perspective of a student, as it is stored in database */
export interface LinkedTutorData {
  /** Id of the tutor related to the student */
  id: string;

// todo add rating, review, comments etc
}

/** Data about a student from the perspective of a tutor, as it is stored in database */
export interface LinkedStudentData {
  /** Id of the student related to the tutor */
  id: string;

// todo add rating, review, comments etc
}

/** Subject data specific to a student user, as it is stored in database */
export interface StudentSubjectData extends LinkedLocaleSubjectData {}

/** Subject data specific to a tutor user */
export interface TutorSubjectData extends LinkedLocaleSubjectData {}
