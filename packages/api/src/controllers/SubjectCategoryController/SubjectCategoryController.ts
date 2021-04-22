import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  CreateSubjectCategoryRequestBody, CreateSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import createSubjectCategoryHandler from './request-handlers/createSubjectCategoryHandler';
import getSubjectCategoriesHandler, {
  GetSubjectCategoryRequestBody, GetSubjectCategoryResponseBody,
} from './request-handlers/getSubjectCategoriesForLocaleHandler';
import updateSubjectCategoryHandler, {
  UpdateSubjectCategoryRequestBody, UpdateSubjectCategoryResponseBody,
} from './request-handlers/updateSubjectCategoryHandler';

const getSubjectCategories = "getSubjectCategories";
const createSubjectCategory = "createSubjectCategory";
const updateSubjectCategory = "updateSubjectCategory";

const exportedNames = [
  getSubjectCategories,
  createSubjectCategory,
  updateSubjectCategory,
] as const;
/*
const namedKeys = { a: "", v: "", c: "", d: "" };

// ! tsoa doesnt seem to accept variables as names for routes, however it takes in variable values
// ! so the routes are named
const { a, c, d, v } = namedKeys;
const custom = {
  val1: "aVal",
};

const { createGenericSubjectX: createGenericSubjecta } = CallableName;

const name1 = "name1x/";
const name23 = CallableName.createGenericSubjectX + "dedec";
console.log(
  `enum: ${CallableName.createSubjectCategory.toString()} enumCustom: ${custom.val1.toString()}`
);

const enumv = CallableName.createSubjectCategory.toString() + "/";
*/
// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/")
export class SubjectCategoryController extends Controller {
  static callableNames = exportedNames;
  static callableNamesMap = arrayToRecord([...exportedNames]);

  /*
  static callableNames = Object.keys(namedKeys).reduce(
    (acc, name) => ({ ...acc, [name]: name }),
    {} as Record<keyof typeof namedKeys, keyof typeof namedKeys>
  );
  */
  typeName = "Subject Categories";

  @Post(createSubjectCategory)
  static createSubjectCategory(
    @Body() body: CreateSubjectCategoryRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateSubjectCategoryResponseBody> {
    return createSubjectCategoryHandler(body, context);
  }

  @Post(getSubjectCategories)
  static getSubjectCategories(
    @Body() body: GetSubjectCategoryRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetSubjectCategoryResponseBody> {
    return getSubjectCategoriesHandler(body, context);
  }

  @Post(updateSubjectCategory)
  static updateSubjectCategory(
    @Body() body: UpdateSubjectCategoryRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateSubjectCategoryResponseBody> {
    return updateSubjectCategoryHandler(body, context);
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
