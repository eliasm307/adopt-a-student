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
    @Body() body: CreateSubjectCategoryRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateSubjectCategoryResponseBody> {
    const auth = verifyRequest(body, context);
    return createSubjectCategoryHandler(body, context);
  }

  @Post(getSubjectCategoriesForLocale)
  static getSubjectCategoriesForLocale(
    @Body() body: GetSubjectCategoriesForLocaleRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectCategoriesForLocaleResponseBody> {
    const auth = verifyRequest(body, context);
    // verify received data
    if (!data?.locale)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not get subjects because provided data is missing subject id"
      );
    return getSubjectCategoriesForLocaleHandler(body, context);
  }

  @Post(getSubjectCategory)
  static getSubjectCategory(
    @Body() body: GetSubjectCategoryRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectCategoryResponseBody> {
    const auth = verifyRequest(body, context);
    if (!body?.locale || !body?.name || !body.data)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Incomplete data provided"
      );

    return getSubjectCategoryHandler(body, context);
  }

  @Post(updateSubjectCategory)
  static updateSubjectCategory(
    @Body() body: UpdateSubjectCategoryRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateSubjectCategoryResponseBody> {
    const auth = verifyRequest(body, context);
    // verify received data
    if (
      !body ||
      !body.updates ||
      typeof body.updates !== "object" ||
      !Object.keys(body.updates).length ||
      !body.id ||
      !body.locale
    )
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update document because provided data is not valid"
      );
    return updateSubjectCategoryHandler(body, context);
  }
}
