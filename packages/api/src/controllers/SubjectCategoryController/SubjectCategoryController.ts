import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateSubjectCategoryRequestBody, CreateSubjectCategoryResponseBody,
  GetSubjectCategoriesForLocaleRequestBody, GetSubjectCategoriesForLocaleResponseBody,
  GetSubjectCategoryRequestBody, GetSubjectCategoryResponseBody, UpdateSubjectCategoryRequestBody,
  UpdateSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import { functionsHttps } from '../../utils/firebase/firebase-admin';
import verifyRequest from '../../utils/verifyRequest';
import createSubjectCategoryHandler from './request-handlers/createSubjectCategoryHandler';
import getSubjectCategoriesForLocaleHandler from './request-handlers/getSubjectCategoriesForLocaleHandler';
import getSubjectCategoryHandler from './request-handlers/getSubjectCategoryHandler';
import updateSubjectCategoryHandler from './request-handlers/updateSubjectCategoryHandler';

const getSubjectCategoriesForLocale = "getSubjectCategoriesForLocale";
const getSubjectCategory = "getSubjectCategory";
const createSubjectCategory = "createSubjectCategory";
const updateSubjectCategory = "updateSubjectCategory";

const exportedNames = [
  getSubjectCategoriesForLocale,
  createSubjectCategory,
  updateSubjectCategory,
  getSubjectCategory,
] as const;

// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/")
export class SubjectCategoryController extends Controller {
  static callableNames = exportedNames;
  static callableNamesMap = arrayToRecord([...exportedNames]);

  typeName = "Subject Categories";

  @Post(createSubjectCategory)
  static createSubjectCategory(
    @Body() body: Partial<CreateSubjectCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateSubjectCategoryResponseBody> {
    const auth = verifyRequest(body, context);

    const { locale, data, name } = body;

    // verify received data
    if (!locale || !data || !name)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not create subject because provided data is  incomplete"
      );

    return createSubjectCategoryHandler({ data, locale, name });
  }

  @Post(getSubjectCategoriesForLocale)
  static getSubjectCategoriesForLocale(
    @Body() body: Partial<GetSubjectCategoriesForLocaleRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectCategoriesForLocaleResponseBody> {
    const auth = verifyRequest(body, context);

    const { locale } = body;

    // verify received data
    if (!locale)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not get subjects because provided data is missing subject id"
      );

    return getSubjectCategoriesForLocaleHandler({ locale });
  }

  @Post(getSubjectCategory)
  static getSubjectCategory(
    @Body() body: Partial<GetSubjectCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectCategoryResponseBody> {
    const auth = verifyRequest(body, context);

    const { id, locale } = body;

    // verify received data
    if (!locale || !id)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Incomplete data provided"
      );

    return getSubjectCategoryHandler({ id, locale });
  }

  @Post(updateSubjectCategory)
  static updateSubjectCategory(
    @Body() body: Partial<UpdateSubjectCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateSubjectCategoryResponseBody> {
    const auth = verifyRequest(body, context);

    const { id, locale, updates } = body;

    // verify received data
    if (!updates || typeof updates !== "object" || !id || !locale)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update document because provided data is not valid"
      );

    if (!Object.keys(updates).length)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update document because no updates were provided"
      );

    return updateSubjectCategoryHandler({ id, locale, updates });
  }
}
