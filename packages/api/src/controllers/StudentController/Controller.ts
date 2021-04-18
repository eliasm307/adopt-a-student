/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Header, Hidden, Post, Route } from 'tsoa';

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
  @Post("CallableName.createStudent.toString()")
  public async createStudent(
    @Body() body: GetStudentsBySubjectsRequestBody,

    @Header() @Hidden() context: FirebaseCallableFunctionContext
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post("CallableName.getStudentsBySubjects.toString()")
  public async getStudentsBySubjects(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Header() @Hidden() context: FirebaseCallableFunctionContext
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post("CallableName.getTutorsBySubjects.toString()")
  public async getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsRequestBody,
    @Header() @Hidden() context: FirebaseCallableFunctionContext
  ): Promise<GetTutorsBySubjectsResponseBody> {
    return getTutorsBySubjects(body, context);
  }
}
