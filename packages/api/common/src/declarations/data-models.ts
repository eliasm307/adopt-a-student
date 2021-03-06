import { ConfidenceLevelEnum } from './enums';
import {
  CategoryId, Country, EmailString, LocaleCode, StudentId, SubjectCategoryId, SubjectCategoryName,
  SubjectId, SubjectName, TutorId, UrlString, UserId,
} from './types';

export interface Entity {}

/*
export interface UserLocale {
  country: Country;
  locale: LocaleCode;
}
*/

/** User data that is publicly available */
export interface PublicUserData extends Entity {
  /** Unique id for a user */
  readonly id: UserId;

  /** Link to profile image, if defined */
  imageUrl?: UrlString | null;
  /** Optional text for users to introduce themselves,
   * describe their experience, what subjects they are interested in etc */
  introduction?: string;
  /** The countries the user prefers for content */
  prefferedCountries: Country[];
  /** The locales a user prefers for content */
  prefferedLocales: LocaleCode[];
  /** Username which will be displayed for a user */
  userName: string;
}
/** Private user data only available to the owner user */
export interface PrivateUserData extends PublicUserData {
  /** Email to allow users to start communicating */
  email: EmailString;
  /** Links to subjects a user is interested in learning/teaching (depends on type of user)
   * and user specific information about the user relating to a specific subject
   */
  relatedSubjects: UserSubjectData[];
}
/** Schema of data that represents a student, as it is stored in database */
export interface PrivateStudentData extends PrivateUserData, PublicStudentData {
  /** Data about the tutors a student is involved with */
  relatedTutors: LinkedTutorData[];
}

export interface PublicStudentData extends PublicUserData {}

/** Schema of data that represents a tutor, only available to the tutor */
export interface PrivateTutorData extends PrivateUserData, PublicTutorData {
  /** Data about the students a teacher is involved with */
  relatedStudents: LinkedStudentData[];
}
export interface PublicTutorData extends PublicUserData {
  /** Represents whether a tutor is available to take on a student */
  available: boolean;
}
/** Data about a subject specific to a user, as it is stored in database
 * // ? should this be public?
 */
export interface UserSubjectData {
  /** Unique id to the related subject */
  readonly id: SubjectId;

  /** A rating of how confident a user feels in the subject, the numbers  */
  confidenceLevel: ConfidenceLevelEnum;
  country: Country;
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
  readonly id: SubjectId;

  /** Existing names for this subject from defined locales
   *
  // todo this should update when locale subjects are changed
   */
  names: SubjectName[];
  /** The categories this generic subject belongs to */
  relatedCategories: SubjectCategoryId[];
  /** Links to other relevant subjects a user might be interested in
     `// todo needs to be syncronised ie if A is related to B then B must be related to A`
    */
  relatedSubjects: SubjectId[];
}
/** Name of a subject category in a specific locale */
export interface LocaleSubjectName {
  locale: LocaleCode;
  name: SubjectName;
}
/** Subject category data in a specific locale */
export interface LocaleSubjectCategoryData {
  /** id of the generic subject, NOT the locale subject, the locale differentiates different locale subjects, that belong to one generic subject */
  id: SubjectId;
  locale: LocaleCode;
  name: SubjectCategoryName;
}
/** Subject category with all locale names */
export interface GenericSubjectCategoryData extends Entity {
  id: CategoryId;
  /** Representations of the same generic subject catories in different locales
    // ? should the key be the country instead?
  */
  locales: Record<LocaleCode, LocaleSubjectCategoryData>;
  /** Existing names for this subject category from defined locales *
  // todo test this should update when locale subjects are changed
  */
  names: SubjectName[];
  /** generic subjects which belong to this generic category
       // todo this should link category to subject and subject to category
    */
  relatedSubjects: SubjectId[];
}
/** Schema of the general public data (not relating to a user) that represents a specific locale dependent subject,
 * as it is stored in database. e.g. "Physics" and "Physiques" are two different LocaleSubjects
 // ! this is represented as separate documents as there might be a lot of data associated with locale subjects, so this prevents every locale subject being loaded when querying generic subjects
*/
export interface LocaleSubjectData extends Entity {
  /** Id of generic subject this locale subject relates to, there should only be 1 */
  readonly id: SubjectId;

  /** Specific country for this subject, for any subjects that might be country dependent, blank means it applies to any */
  country: Country;
  /** Description of the subject */
  description: string;
  /** Represents a language that a subject is in */
  locale: LocaleCode;
  name: SubjectName;
  /** Ids of students needing help with this subject `// todo needs to be syncronised` */
  relatedStudents: StudentId[];
  /** Ids of tutors available to help with this subject `// todo needs to be syncronised` */
  relatedTutors: TutorId[];
}
/** Data about a tutor from the perspective of a student, as it is stored in database */
export interface LinkedTutorData {
  /** Id of the tutor related to the student */
  id: TutorId;
}
/** Data about a student from the perspective of a tutor, as it is stored in database */
export interface LinkedStudentData {
  /** Id of the student related to the tutor */
  id: StudentId;
}
/** Subject data specific to a student user, as it is stored in database */
export interface StudentSubjectData extends UserSubjectData {}
/** Subject data specific to a tutor user */
export interface TutorSubjectData extends UserSubjectData {}
