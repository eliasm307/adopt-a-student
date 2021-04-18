import { Body, Controller, Header, Post, Route } from 'tsoa';

import {
  GetStudentsBySubjectsRequestBody, GetStudentsBySubjectsResponseBody,
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import getStudentsBySubjectsHandler from '../request-handlers/getStudentsBySubjectsHandler';
import getTutorsBySubjectsHandler from '../request-handlers/getTutorsBySubjectsHandler';

/** Provided automatically by Firebase */
type FirebaseCallableFunctionContext = any;

@Route("/")
export class StudentsController extends Controller {
  @Post()
  public static async createStudent(
    @Body() body: GetStudentsBySubjectsRequestBody,

    @Header() context: FirebaseCallableFunctionContext
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post()
  public static async getStudentsBySubjects(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Header() context: FirebaseCallableFunctionContext
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post()
  public static async getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsRequestBody,
    @Header() context: FirebaseCallableFunctionContext
  ): Promise<GetTutorsBySubjectsResponseBody> {
    return getTutorsBySubjectsHandler(body, context);
  }
}
