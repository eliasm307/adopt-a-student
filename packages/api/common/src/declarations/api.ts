import {
  PrivateStudentData, PrivateTutorData, PublicStudentData, PublicTutorData,
} from './data-models';
import { SubjectId, TutorId } from './types';

export interface GetStudentsBySubjectsRequestBody {
  subjectIds: SubjectId[];
}
export interface GetStudentsBySubjectsResponseBody {
  students: PublicStudentData[];
}

export interface GetTutorsBySubjectsRequestBody {
  subjectIds: SubjectId[];
}
export interface GetTutorsBySubjectsResponseBody {
  tutors: PublicTutorData[];
}

export interface CreateTutorRequestBody {
  tutor: Omit<PrivateTutorData, "id">;
}

export interface CreateTutorResponseBody {
  tutor: PrivateTutorData;
}

export interface CreateStudentRequestBody {
  student: Omit<PrivateStudentData, "id">;
}

export interface CreateStudentResponseBody {
  student: PrivateStudentData;
}

export interface UpdateTutorRequestBody {
  updates: Partial<Omit<PrivateTutorData, "id">>;
}

export interface UpdateTutorResponseBody {
  result: PrivateTutorData;
}

export interface UpdateStudentRequestBody {
  updates: Partial<Omit<PrivateStudentData, "id">>;
}

export interface UpdateStudentResponseBody {
  result: PrivateStudentData;
}
export interface GetTutorRequestBody {
  id: TutorId;
}

export interface GetTutorResponseBody {
  tutor: PrivateTutorData | PublicTutorData;
}
