import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateGenericSubjectRequestBody, CreateGenericSubjectResponseBody, CreateLocaleSubjectRequestBody,
  CreateLocaleSubjectResponseBody, GetSubjectRequestBody, GetSubjectResponseBody,
  GetSubjectsByCategoryRequestBody, GetSubjectsByCategoryResponseBody,
  UpdateLocaleSubjectRequestBody, UpdateLocaleSubjectResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import { functionsHttps } from '../../utils/firebase/firebase-admin';
import verifyRequest from '../../utils/verifyRequest';
import getPrivateTutorData from '../TutorController/request-handlers/getPrivateTutorDataHandler';
import getPublicTutorData from '../TutorController/request-handlers/getPublicTutorDataHandler';
import createGenericSubjectHandler from './request-handlers/createGenericSubjectHandler';
import createLocaleSubjectHandler from './request-handlers/createLocaleSubjectHandler';
import getSubjectHandler from './request-handlers/getSubjectHandler';
import getSubjectsByCategoryHandler from './request-handlers/getSubjectsByCategoryHandler';
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
    @Body() body: Partial<CreateGenericSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateGenericSubjectResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { data } = body;

    if (!data)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Data not provided"
      );

    return createGenericSubjectHandler({ data });
  }

  @Post(createLocaleSubject)
  static createLocaleSubject(
    @Body() body: Partial<CreateLocaleSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateLocaleSubjectResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { data, genericSubjectId } = body;

    if (!data || !genericSubjectId)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Data not provided"
      );

    return createLocaleSubjectHandler({ data, genericSubjectId });
  }

  @Post(getSubject)
  static getSubject(
    @Body() body: Partial<GetSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { country, id, locale } = body;

    // verify received data
    if (!id || !country || !locale)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not get subjects because provided data is missing subject id"
      );

    return getSubjectHandler({ country, id, locale });
  }

  /**
   * Retreives data about a tutor user. If the tutor user owns the data then they get all the data, otherwise it is restricted to 'public' data.
   */
  @Post(getSubjectsByCategory)
  static getSubjectsByCategory(
    @Body() body: Partial<GetSubjectsByCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectsByCategoryResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { categoryId, locale } = body;

    // verify received data
    if (!locale || !categoryId)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not get subjects by category because provided data is missing locale or required subject category id"
      );

    return getSubjectsByCategoryHandler({ categoryId, locale });
  }

  @Post(updateLocaleSubject)
  static updateLocaleSubject(
    @Body() body: Partial<UpdateLocaleSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateLocaleSubjectResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { country, id, locale, updates } = body;

    // verify received data
    if (!updates || typeof updates !== "object" || !id || !country || !locale)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update tutor because provided data is not valid"
      );

    if (!Object.keys(updates).length)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update subject because no updates were provided"
      );

    return updateLocaleSubjectHandler({ country, id, locale, updates });
  }
}
