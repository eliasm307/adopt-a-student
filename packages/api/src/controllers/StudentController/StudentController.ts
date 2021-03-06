import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateStudentRequestBody, CreateStudentResponseBody, GetStudentRequestBody,
  GetStudentResponseBody, GetStudentsBySubjectsRequestBody, GetStudentsBySubjectsResponseBody,
  isArray, isEmptyObject, isObject, isPrivateStudentData, isTruthyString, UpdateStudentRequestBody,
  UpdateStudentResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import { functionsHttps } from '../../utils/firebase/firebase-admin';
import verifyRequest from '../../utils/verifyRequest';
import createStudentHandler from './request-handlers/createStudent';
import getPrivateStudentData from './request-handlers/getPrivateStudentData';
import getPublicStudentData from './request-handlers/getPublicStudentDataHandler';
import getStudentsBySubjectsHandler from './request-handlers/getStudentsBySubjectsHandler';
import updateStudentHandler from './request-handlers/updateStudentHandler';

const createStudent = "createStudent";
const getStudentsBySubjects = "getStudentsBySubjects";
const updateStudent = "updateStudent";
const getStudent = "getStudent";

const exportedNames = [
  createStudent,
  getStudent,
  getStudentsBySubjects,
  getStudentsBySubjects,
  updateStudent,
] as const;

// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/")
export class StudentsController extends Controller {
  static callableNames = exportedNames;
  static callableNamesMap = arrayToRecord([...exportedNames]);
  static id = "Students";

  @Post(createStudent)
  static createStudent(
    @Body() body: Partial<CreateStudentRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateStudentResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { student } = body;

    console.log(__filename, "Start", { uid, student });

    if (!student || !isPrivateStudentData({ ...student, id: uid }))
      throw new functionsHttps.HttpsError(
        "invalid-argument",
        "Provided data is not valid"
      );

    return createStudentHandler({ uid, student });
  }

  /**
   * Retreives data about a student user. If the student user owns the data then they get all the data, otherwise it is restricted to 'public' data.
   */
  @Post(getStudent)
  static getStudent(
    @Body() body: Partial<GetStudentRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetStudentResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { id } = body;

    console.log(__filename, "Start", { uid, id });

    if (!id || !isTruthyString(id))
      throw new functionsHttps.HttpsError(
        "invalid-argument",
        "Provided data is not valid"
      );

    console.log(__filename, `${getStudent}`, { body });

    return uid === id
      ? getPrivateStudentData({ id })
      : getPublicStudentData({ id });
  }

  @Post(getStudentsBySubjects)
  static getStudentsBySubjects(
    @Body() body: Partial<GetStudentsBySubjectsRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetStudentsBySubjectsResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { subjectIds } = body;

    // verify received data
    if (!isArray(subjectIds))
      throw new functionsHttps.HttpsError(
        "invalid-argument",
        "Could not get students by subjects because provided locale subject ids are not valid format"
      );

    return getStudentsBySubjectsHandler({ subjectIds });
  }

  @Post(updateStudent)
  static updateStudent(
    @Body() body: Partial<UpdateStudentRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateStudentResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { updates } = body;

    // verify received data
    if (!updates || !isObject(updates))
      throw new functionsHttps.HttpsError(
        "invalid-argument",
        "Could not update tutor because provided data is not valid"
      );

    if (isEmptyObject(updates))
      throw new functionsHttps.HttpsError(
        "invalid-argument",
        "Could not update tutor because no updates were provided"
      );

    return updateStudentHandler({ uid, updates });
  }
}
