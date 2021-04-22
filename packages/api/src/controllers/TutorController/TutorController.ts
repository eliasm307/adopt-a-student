import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateTutorRequestBody, CreateTutorResponseBody, GetTutorRequestBody, GetTutorResponseBody,
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody, isPrivateTutorData,
} from '@adopt-a-student/common';

import isId from '../../../common/src/utils/type-predicates/isId';
import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import { functionsHttps } from '../../utils/firebase/firebase-admin';
import verifyRequest from '../../utils/verifyRequest';
import getPrivateTutorData from '../TutorController/request-handlers/getPrivateTutorDataHandler';
import getPublicTutorData from '../TutorController/request-handlers/getPublicTutorDataHandler';
import createTutorHandler from './request-handlers/createTutorHandler';
import getTutorsBySubjectsHandler from './request-handlers/getTutorsBySubjectsHandler';

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
    @Body() body: Partial<CreateTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateTutorResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { tutor } = body;

    if (!tutor || !isPrivateTutorData({ tutor, id: uid }))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Provided data is invalid"
      );

    return createTutorHandler({ tutor, uid });
  }

  /**
   * Retreives data about a tutor user. If the tutor user owns the data then they get all the data, otherwise it is restricted to 'public' data.
   * @param body
   * @param context
   * @returns
   */
  @Post(getTutor)
  static getTutor(
    @Body() body: Partial<GetTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetTutorResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { id } = body;

    if (!isId(id))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Provided data is invalid"
      );

    return uid === id
      ? getPrivateTutorData({ id })
      : getPublicTutorData({ id });
  }

  @Post(getTutorsBySubjects)
  static getTutorsBySubjects(
    @Body() body: Partial<GetTutorsBySubjectsRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetTutorsBySubjectsResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { subjectIds } = body;

    if (!)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Provided data is invalid"
      );

    return getTutorsBySubjectsHandler({ subjectIds });
  }

  @Post(updateTutor)
  static updateTutor(
    @Body() body: Partial<UpdateTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateTutorResponseBody> {
    const { uid } = verifyRequest(body, context);

    // verify received data
    if (
      !body ||
      !body.updates ||
      typeof body.updates !== "object" ||
      !Object.keys(body.updates).length
    )
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update tutor because provided data is not valid"
      );

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
