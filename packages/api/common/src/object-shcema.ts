import {
  LinkedLocaleSubjectData, PrivateStudentData, PrivateTutorData, PrivateUserData,
  StudentSubjectData, TutorSubjectData,
} from './data-schema';

/** A user object instance that allows reading and editing data to/from the database */
export interface PrivateUser<
  D extends PrivateUserData,
  S extends LinkedLocaleSubjectData
> {
  /** Readonly user data */
  readonly data: Readonly<D>;
  /** User id */
  readonly id: string;

  /** Adds a subject as a related user subject */
  addSubject(subjectId: string): Promise<void>;
  /** Deletes all user data from the system */
  deleteData(): Promise<void>;
  /** Get user data on a specific subject */
  getSubject(subjectId: string): Promise<S>;
  /**
   * Get all subjects for this user
   * // todo this should be paginated if lists get large
   */
  getSubjects(): Map<string, S>;
  /** Removes subject from user data */
  removeSubject(subjectId: string): Promise<void>;
  /** Updates entire user data */
  updateData(newData: D): Promise<void>;
}

/** A student object instance that allows reading and editing data to/from the database */
export interface PrivateStudent
  extends PrivateUser<PrivateStudentData, StudentSubjectData> {}

/** A tutor object instance that allows reading and editing data to/from the database */
export interface PrivateTutor
  extends PrivateUser<PrivateTutorData, TutorSubjectData> {}
