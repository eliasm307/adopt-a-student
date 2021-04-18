/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import { GetStudentsBySubjectsRequestBody } from '@adopt-a-student/common';

/** Provided automatically by Firebase */
// type FirebaseCallableFunctionContext = any;

// ! tsoa doesnt seem to accept variables as names for routes, however it takes in variable values
// ! so the routes are named after the variables, and the actual name is exported

const createTutor = "createTutor";
const getTutorsBySubjects = "GetTutorsBySubjects";
const a3 = "a3";

const exportedNames = [createTutor, getTutorsBySubjects, a3] as const;

/*
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
*/

// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/")
export class TutorController extends Controller {
  /* static callableNames = Object.keys(namedKeys).reduce(
    (acc, name) => ({ ...acc, [name]: name }),
    {} as Record<keyof typeof namedKeys, keyof typeof namedKeys>
  );
  */
  static callableNames = exportedNames;

  @Post(createTutor)
  public static createTutor(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Query() @Hidden() context: any = {}
  ): Promise<string> {
    return Promise.resolve("ss");
  }

  @Post(getTutorsBySubjects)
  public static getTutorsBySubjects(
    @Body() body: GetStudentsBySubjectsRequestBody,
    @Query() @Hidden() context: any = {}
  ): Promise<string> {
    return Promise.resolve("edec");
  }
}

/*
enum wer {
  a,
  b,
  c,
}
*/

// const a = { ...wer };

// const b = Object.values(a).map((k) => k as const);

// type q = keyof typeof a;
// const c:  q,  = "";
