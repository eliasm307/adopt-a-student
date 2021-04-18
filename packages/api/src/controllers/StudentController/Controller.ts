/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateStudentRequestBody, CreateStudentResponseBody, GetStudentsBySubjectsRequestBody,
  GetStudentsBySubjectsResponseBody, GetTutorsBySubjectsRequestBody,
  GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import { CallableName } from '../../constants';
import getTutorsBySubjects from '../TutorController/request-handlers/getTutorsBySubjectsHandler';
import createStudent from './request-handlers/createStudent';
import getStudentsBySubjectsHandler from './request-handlers/getStudentsBySubjectsHandler';

/** Provided automatically by Firebase */
type FirebaseCallableFunctionContext = any;

const namedKeys = { a: "", v: "", c: "", d: "" };

// ! tsoa doesnt seem to accept variables as names for routes, however it takes in variable values
// ! so the routes are named
const { a, c, d, v } = namedKeys;
const custom = {
  val1: "aVal",
};

const { createGenericSubjectX: createGenericSubjecta } = CallableName;

const name1 = "name1x/";
const name23 = CallableName.createGenericSubjectX + "dedec";
console.log(
  `enum: ${CallableName.getStudentsBySubjects.toString()} enumCustom: ${custom.val1.toString()}`
);

const enumv = CallableName.getStudentsBySubjects.toString() + "/";

// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route()
export default class StudentsController extends Controller {
  static callableNames = Object.keys(namedKeys).reduce(
    (acc, name) => ({ ...acc, [name]: name }),
    {} as Record<keyof typeof namedKeys, keyof typeof namedKeys>
  );

  @Post(a)
  static createStudent(
    @Body() body: CreateStudentRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {}
  ): Promise<CreateStudentResponseBody> {
    return createStudent(body, context);
  }

  @Post(c)
  static getStudentsBySubjects(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {}
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post(d)
  static getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {}
  ): Promise<GetTutorsBySubjectsResponseBody> {
    return getTutorsBySubjects(body, context);
  }
}

enum wer {
  a,
  b,
  c,
}

// const a = { ...wer };

// const b = Object.values(a).map((k) => k as const);

type q = keyof typeof a;
// const c:  q,  = "";
