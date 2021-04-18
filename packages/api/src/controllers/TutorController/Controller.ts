/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  GetStudentsBySubjectsRequestBody, GetTutorsBySubjectsRequestBody,
} from '@adopt-a-student/common';

import { CallableName } from '../../constants';

/** Provided automatically by Firebase */
type FirebaseCallableFunctionContext = any;

// ! tsoa doesnt seem to accept variables as names for routes, however it takes in variable values
// ! so the routes are named

const a1 = "";
const a2 = "";
const a3 = "";

const namedKeys = { a1, a2, a3 };
// const { x: a, z: c, p: d } = namedKeys;
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

  @Post(a1)
  static createStudent(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {}
  ): Promise<any> {
    return Promise.resolve();
  }

  @Post(a2)
  static getStudentsBySubjects(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {}
  ): Promise<any> {
    return Promise.resolve();
  }

  @Post(a3)
  static getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {}
  ): Promise<any> {
    return Promise.resolve();
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
