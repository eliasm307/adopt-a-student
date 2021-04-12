/** Schema of data that represents a user, as it is stored in database */
export interface UserData {
  /** Unique id for a user */
  readonly id: string;

  /** Email to allow users to start communicating */
  email: string;
  /** Optional text for users to introduce themselves,
   * describe their experience, what subjects they are interested in etc */
  introduction?: string;
  /** Links to subjects a user is interested in learning/teaching (depends on type of user)
   * and user specific information about the user relating to a specific subject
   */
  relatedSubjects: UserSubjectData[];
  /** Username which will be displayed for a user */
  username: string;
}

/** Confidence level options mapped to integers */
export enum ConfidenceLevelEnum {
  /** No experience */
  None,
  /** Understands the basics of the subject */
  Low,
  /** Average level understanding */
  Medium,
  /** Comfortable with advanced topics in the subject */
  High,
}

/** Data about a subject specific to a user, as it is stored in database */
export interface UserSubjectData {
  /** Unique id to the related subject */
  readonly id: string;

  /** A rating of how confident a user feels in the subject, the numbers  */
  confidenceLevel: ConfidenceLevelEnum;
  /** Detail of the users experience with the subject */
  detail: string;
}

/** Schema of the general public data (not relating to a user) that represents a subject,
 * as it is stored in database */
export interface PublicSubjectData {
  /** Unique id */
  readonly id: string;

  /** Description of the subject */
  description: string;
  /** Links to other relevant subjects a user might be interested in */
  relatedSubjectIds: string[];
}

/** Data about a tutor from the perspective of a student, as it is stored in database */
export interface StudentSubTutorData {
  /** Id of the tutor related to the student */
  id: string;
}

/** Data about a student from the perspective of a tutor, as it is stored in database */
export interface TutorSubStudentData {
  /** Id of the student related to the tutor */
  id: string;
}

/** Subject data specific to a student user, as it is stored in database */
export interface StudentSubjectData extends UserSubjectData {}

/** Subject data specific to a tutor user */
export interface TutorSubjectData extends UserSubjectData {}

/** Schema of data that represents a student, as it is stored in database */
export interface StudentData extends UserData {
  /** Data about the tutors a student is involved with */
  tutors: StudentSubTutorData[];
}

/** Schema of data that represents a tutor, as it is stored in database */
export interface TutorData extends UserData {
  /** Represents whether a tutor is available to take on a student */
  available: boolean;
  /** Data about the students a teacher is involved with */
  students: TutorSubStudentData[];
}

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
