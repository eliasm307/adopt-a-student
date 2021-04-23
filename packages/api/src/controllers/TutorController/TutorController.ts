import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateTutorRequestBody, CreateTutorResponseBody, GetTutorRequestBody, GetTutorResponseBody,
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody, isArray, isEmptyObject, isObject,
  isPrivateTutorData, isString, UpdateTutorRequestBody, UpdateTutorResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import { functionsHttps } from '../../utils/firebase/firebase-admin';
import verifyRequest from '../../utils/verifyRequest';
import getPrivateTutorData from '../TutorController/request-handlers/getPrivateTutorDataHandler';
import getPublicTutorData from '../TutorController/request-handlers/getPublicTutorDataHandler';
import createTutorHandler from './request-handlers/createTutorHandler';
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
    @Body() body: Partial<CreateTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateTutorResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { tutor } = body;

    if (!tutor || !isObject(tutor) || !isPrivateTutorData({ tutor, id: uid }))
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

    if (!isString(id))
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

    // verify received data
    if (!isArray(subjectIds))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not get students by subjects because provided locale subject ids are not valid format"
      );

    return getTutorsBySubjectsHandler({ subjectIds });
  }

  @Post(updateTutor)
  static updateTutor(
    @Body() body: Partial<UpdateTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateTutorResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { updates } = body;

    // verify received data
    if (!isObject(updates))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update tutor because provided data is not valid"
      );

    if (isEmptyObject(updates))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update tutor because no updates were provided"
      );

    return updateTutorHandler({ uid, updates });
  }
}
