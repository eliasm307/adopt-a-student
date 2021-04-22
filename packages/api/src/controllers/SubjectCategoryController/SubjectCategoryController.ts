import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateSubjectCategoryRequestBody, CreateSubjectCategoryResponseBody,
  GetSubjectCategoriesForLocaleRequestBody, GetSubjectCategoriesForLocaleResponseBody,
  GetSubjectCategoryRequestBody, GetSubjectCategoryResponseBody, UpdateSubjectCategoryRequestBody,
  UpdateSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
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
    return getSubjectCategoriesForLocaleHandler(body, context);
  }

  @Post(getSubjectCategory)
  static getSubjectCategory(
    @Body() body: GetSubjectCategoryRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectCategoryResponseBody> {
    const auth = verifyRequest(body, context);
    return getSubjectCategoryHandler(body, context);
  }

  @Post(updateSubjectCategory)
  static updateSubjectCategory(
    @Body() body: UpdateSubjectCategoryRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateSubjectCategoryResponseBody> {
    const auth = verifyRequest(body, context);
    return updateSubjectCategoryHandler(body, context);
  }
}
