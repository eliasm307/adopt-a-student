import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

/* eslint-disable @typescript-eslint/require-await */
import {
  CreateTutorRequestBody, CreateTutorResponseBody, GetTutorRequestBody, GetTutorResponseBody,
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody, UpdateTutorRequestBody,
  UpdateTutorResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import verifyRequest from '../../utils/verifyRequest';
import createTutorHandler from './request-handlers/createTutorHandler';
import getPrivateTutorData from './request-handlers/getPrivateTutorDataHandler';
import getPublicTutorData from './request-handlers/getPublicTutorDataHandler';
import getTutorsBySubjectsHandler from './request-handlers/getTutorsBySubjectsHandler';
import updateTutorHandler from './request-handlers/updateTutorHandler';

const createTutor = "createTutor";
const getTutorsBySubjects = "getTutorsBySubjects";
const updateTutor = "updateTutor";
const getTutor = "getTutor";

const exportedNames = [
  createTutor,
  getTutor,
  getTutorsBySubjects,
  getTutorsBySubjects,
  updateTutor,
] as const;

// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/")
export class TutorsController extends Controller {
  static callableNames = exportedNames;
  static callableNamesMap = arrayToRecord([...exportedNames]);
  static typeName = "Tutors";

  @Post(createTutor)
  static createTutor(
    @Body() body: CreateTutorRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateTutorResponseBody> {
    return createTutorHandler(body, context);
  }

  /**
   * Retreives data about a tutor user. If the tutor user owns the data then they get all the data, otherwise it is restricted to 'public' data.
   * @param body
   * @param context
   * @returns
   */
  @Post(getTutor)
  static getTutor(
    @Body() body: GetTutorRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetTutorResponseBody> {
    const { id } = body;
    const { uid } = verifyRequest(body, context);

    return uid === id
      ? getPrivateTutorData(body, context)
      : getPublicTutorData(body, context);
  }

  @Post(getTutorsBySubjects)
  static getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetTutorsBySubjectsResponseBody> {
    return getTutorsBySubjectsHandler(body, context);
  }

  @Post(updateTutor)
  static updateTutor(
    @Body() body: UpdateTutorRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateTutorResponseBody> {
    return updateTutorHandler(body, context);
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
