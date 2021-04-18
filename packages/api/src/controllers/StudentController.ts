import { Body, Controller, Header, Post, Route } from 'tsoa';

import { PublicStudentData, PublicTutorData } from '@adopt-a-student/common';

import getStudentsBySubjectsHandler from '../request-handlers/getStudentsBySubjectsHandler';
import getTutorsBySubjectsHandler from '../request-handlers/getTutorsBySubjectsHandler';

/*
const data: GetStudentsBySubjectsResult = {
  data: [
    {
      id: "student",
      prefferedLocales: [],
      userName: "",
    },
  ],
};
*/

export interface GetStudentsBySubjectsBody {
  localeSubjectIds: string[];
}
export interface GetStudentsBySubjectsResult {
  data: PublicStudentData[];
}

export interface GetTutorsBySubjectsBody {
  localeSubjectIds: string[];
}
export interface GetTutorsBySubjectsResult {
  data: PublicTutorData[];
}

@Route("/")
export class StudentsController extends Controller {
  // @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public static async getStudentsBySubjects(
    @Body() body: GetStudentsBySubjectsBody,
    @Header() context: any
  ): Promise<GetStudentsBySubjectsResult> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post()
  public static async getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsBody,
    @Header() context: any
  ): Promise<GetTutorsBySubjectsResult> {
    return getTutorsBySubjectsHandler(body, context);
  }
}
