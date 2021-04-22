import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateGenericSubjectRequestBody, CreateGenericSubjectResponseBody, CreateLocaleSubjectRequestBody,
  CreateLocaleSubjectResponseBody, GetSubjectRequestBody, GetSubjectResponseBody,
  GetTutorRequestBody, GetTutorResponseBody, UpdateLocaleSubjectRequestBody,
  UpdateLocaleSubjectResponseBody,
} from '@adopt-a-student/common';

import verifyRequest from '../../../utils/verifyRequest';
import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import { functionsHttps } from '../../utils/firebase/firebase-admin';
import getPrivateTutorData from '../TutorController/request-handlers/getPrivateTutorDataHandler';
import getPublicTutorData from '../TutorController/request-handlers/getPublicTutorDataHandler';
import getGenericSubjectsByCategory from '../utils/getGenericSubjectsByCategory';
import getLocaleSubjectFromGenericSubject from '../utils/getLocaleSubjectFromGenericSubject';
import createGenericSubjectHandler from './request-handlers/createGenericSubjectHandler';
import createLocaleSubjectHandler from './request-handlers/createLocaleSubjectHandler';
import getSubjectHandler from './request-handlers/getSubjectHandler';
import updateLocaleSubjectHandler from './request-handlers/updateLocaleSubjectHandler';

const createGenericSubject = "createGenericSubject";
const createLocaleSubject = "createLocaleSubject";
const getSubject = "getSubject";
const getSubjectsByCategory = "getSubjectsByCategory";
const updateLocaleSubject = "updateLocaleSubject";

const exportedNames = [
  createGenericSubject,
  getSubjectsByCategory,
  createLocaleSubject,
  createLocaleSubject,
  getSubject,
  updateLocaleSubject,
] as const;

// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/")
export class SubjectsController extends Controller {
  static callableNames = exportedNames;
  static callableNamesMap = arrayToRecord([...exportedNames]);
  static typeName = "Subject";

  @Post(createGenericSubject)
  static createGenericSubject(
    @Body() body: CreateGenericSubjectRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateGenericSubjectResponseBody> {
    return createGenericSubjectHandler(body, context);
  }

  @Post(createLocaleSubject)
  static createLocaleSubject(
    @Body() body: CreateLocaleSubjectRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateLocaleSubjectResponseBody> {
    if (!props?.data || !props.genericSubjectId)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Data not provided"
      );

    return createLocaleSubjectHandler(body, context);
  }

  @Post(getSubject)
  static getSubject(
    @Body() body: GetSubjectRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectResponseBody> {
    // verify received data
    if (!data?.id || !data.country || !data.locale)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not get subjects because provided data is missing subject id"
      );

    return getSubjectHandler(body, context);
  }

  /**
   * Retreives data about a tutor user. If the tutor user owns the data then they get all the data, otherwise it is restricted to 'public' data.
   */
  @Post(getSubjectsByCategory)
  static getSubjectsByCategory(
    @Body() body: GetTutorRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetTutorResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { id } = body;

    // verify received data
    if (!data?.locale || !data.categoryId)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not get subjects by category because provided data is missing locale or required subject category id"
      );

    return uid === id
      ? getPrivateTutorData(body, context)
      : getPublicTutorData(body, context);
  }

  @Post(updateLocaleSubject)
  static updateLocaleSubject(
    @Body() body: UpdateLocaleSubjectRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateLocaleSubjectResponseBody> {
    // verify received data
    if (
      !body ||
      !body.updates ||
      typeof body.updates !== "object" ||
      !Object.keys(body.updates).length ||
      !body.id
    )
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update tutor because provided data is not valid"
      );
    return updateLocaleSubjectHandler(body, context);
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
