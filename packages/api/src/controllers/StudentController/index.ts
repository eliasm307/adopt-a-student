/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Header, Post, Route } from 'tsoa';

import {
  GetStudentsBySubjectsRequestBody, GetStudentsBySubjectsResponseBody,
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import getTutorsBySubjects from '../TutorController/request-handlers/getTutorsBySubjectsHandler';
import getStudentsBySubjectsHandler from './request-handlers/getStudentsBySubjectsHandler';

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
    return getTutorsBySubjects(body, context);
  }
}
