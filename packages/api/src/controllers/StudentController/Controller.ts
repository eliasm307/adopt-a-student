/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  GetStudentsBySubjectsRequestBody, GetStudentsBySubjectsResponseBody,
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import { CallableName } from '../../constants';
import getTutorsBySubjects from '../TutorController/request-handlers/getTutorsBySubjectsHandler';
import getStudentsBySubjectsHandler from './request-handlers/getStudentsBySubjectsHandler';

/** Provided automatically by Firebase */
type FirebaseCallableFunctionContext = any;

const custom = {
  val1: "aVal",
};

const name1 = "name1x/";
const name23 = CallableName.createGenericSubject + "dedec";
console.log(
  `enum: ${CallableName.getStudentsBySubjects.toString()} enumCustom: ${custom.val1.toString()}`
);

const enumv = CallableName.getStudentsBySubjects.toString() + "/";

// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/a")
export class StudentsController extends Controller {
  @Post(name1)
  public async createStudent(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post(CallableName.getStudentsBySubjects.toLocaleLowerCase() + "x/")
  public async getStudentsBySubjects(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post(name23)
  public async getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext
  ): Promise<GetTutorsBySubjectsResponseBody> {
    return getTutorsBySubjects(body, context);
  }
}
