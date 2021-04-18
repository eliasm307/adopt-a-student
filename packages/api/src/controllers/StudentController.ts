import { Body, Controller, Header, Post, Route } from 'tsoa';

import {
  GetStudentsBySubjectsRequestBody, GetStudentsBySubjectsResponseBody,
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import getStudentsBySubjectsHandler from '../request-handlers/getStudentsBySubjectsHandler';
import getTutorsBySubjectsHandler from '../request-handlers/getTutorsBySubjectsHandler';

@Route("/")
export class StudentsController extends Controller {
  @Post()
  public static async createStudent(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Header() context: any
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  // @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public static async getStudentsBySubjects(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Header() context: any
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post()
  public static async getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsRequestBody,
    @Header() context: any
  ): Promise<GetTutorsBySubjectsResponseBody> {
    return getTutorsBySubjectsHandler(body, context);
  }
}
