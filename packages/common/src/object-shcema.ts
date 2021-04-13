import {
  StudentData,
  StudentSubjectData,
  TutorData,
  TutorSubjectData,
  UserData,
  UserSubjectData,
} from "./data-schema";

/** A user object instance that allows reading and editing data to/from the database */
export interface User<D extends UserData, S extends UserSubjectData> {
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
export interface Student extends User<StudentData, StudentSubjectData> {}

/** A tutor object instance that allows reading and editing data to/from the database */
export interface Tutor extends User<TutorData, TutorSubjectData> {}
