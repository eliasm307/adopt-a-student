import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  LinkStudentAndSubjectRequestBody, LinkStudentAndSubjectResponseBody,
  LinkStudentAndTutorRequestBody, LinkStudentAndTutorResponseBody,
  LinkSubjectAndSubjectCategoryRequestBody, LinkSubjectAndSubjectCategoryResponseBody,
  LinkSubjectsRequestBody, LinkSubjectsResponseBody, LinkTutorAndSubjectRequestBody,
  LinkTutorAndSubjectResponseBody, UnlinkStudentAndSubjectRequestBody,
  UnlinkStudentAndSubjectResponseBody, UnlinkStudentAndTutorRequestBody,
  UnlinkStudentAndTutorResponseBody, UnlinkSubjectAndSubjectCategoryRequestBody,
  UnlinkSubjectAndSubjectCategoryResponseBody, UnlinkSubjectsRequestBody,
  UnlinkSubjectsResponseBody, UnlinkTutorAndSubjectRequestBody, UnlinkTutorAndSubjectResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import linkStudentAndSubjectHandler from './request-handlers/linkStudentAndSubjectHandler';
import linkStudentAndTutorHandler from './request-handlers/linkStudentAndTutorHandler';
import linkSubjectAndSubjectCategoryHandler from './request-handlers/linkSubjectAndSubjectCategoryHandler';
import linkSubjectsHandler from './request-handlers/linkSubjectsHandler';
import linkTutorAndSubjectHandler from './request-handlers/linkTutorAndSubjectHandler';
import unlinkStudentAndSubjectHandler from './request-handlers/unlinkStudentAndSubjectHandler';
import unlinkStudentAndTutorHandler from './request-handlers/unlinkStudentAndTutorHandler';
import unlinkSubjectAndSubjectCategoryHandler from './request-handlers/unlinkSubjectAndSubjectCategoryHangler';
import unlinkSubjectsHandler from './request-handlers/unlinkSubjectsHandler';
import unlinkTutorAndSubjectHandler from './request-handlers/unlinkTutorAndSubjectHandler';

const linkSubjects = "linkSubjects";
const linkSubjectAndSubjectCategory = "linkSubjectAndSubjectCategory";
const linkStudentAndTutor = "linkStudentAndTutor";
const linkTutorAndSubject = "linkTutorAndLocaleSubject";
const linkStudentAndSubject = "linkStudentAndSubject";

const unlinkSubjects = "unlinkSubjects";
const unlinkSubjectAndSubjectCategory = "unlinkSubjectAndSubjectCategory";
const unlinkStudentAndTutor = "unlinkStudentAndTutor";
const unlinkTutorAndSubject = "unlinkTutorAndSubject";
const unlinkStudentAndSubject = "unlinkStudentAndSubject";

const exportedNames = [
  linkSubjects,
  linkStudentAndSubject,
  linkTutorAndSubject,
  linkSubjectAndSubjectCategory,
  linkStudentAndTutor,

  unlinkSubjects,
  unlinkStudentAndSubject,
  unlinkTutorAndSubject,
  unlinkSubjectAndSubjectCategory,
  unlinkStudentAndTutor,
] as const;

// tsoa hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/")
export class RelationshipController extends Controller {
  static callableNames = exportedNames;
  static callableNamesMap = arrayToRecord([...exportedNames]);
  static typeName = "Relationships";

  // todo add this to other controllers? or should controllers be instantiable with firebaseAdmin dependency injected?
  // should not be instantiable as the methods are stateless
  private constructor() {
    super();
  }

  /**
   * Retreives data about a tutor user. If the tutor user owns the data then they get all the data, otherwise it is restricted to 'public' data.
   * @param body
   * @param context
   * @returns
   */
  @Post(linkStudentAndSubject)
  static linkStudentAndSubject(
    @Body() body: Partial<LinkStudentAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkStudentAndSubjectResponseBody> {
    return linkStudentAndSubjectHandler(body, context);
  }

  @Post(linkStudentAndTutor)
  static linkStudentAndTutor(
    @Body() body: Partial<LinkStudentAndTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkStudentAndTutorResponseBody> {
    return linkStudentAndTutorHandler(body, context);
  }

  @Post(linkSubjectAndSubjectCategory)
  static linkSubjectAndSubjectCategory(
    @Body() body: Partial<LinkSubjectAndSubjectCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkSubjectAndSubjectCategoryResponseBody> {
    return linkSubjectAndSubjectCategoryHandler(body, context);
  }

  @Post(linkSubjects)
  static linkSubjects(
    @Body() body: Partial<LinkSubjectsRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkSubjectsResponseBody> {
    return linkSubjectsHandler(body, context);
  }

  @Post(linkTutorAndSubject)
  static linkTutorAndSubject(
    @Body() body: Partial<LinkTutorAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkTutorAndSubjectResponseBody> {
    return linkTutorAndSubjectHandler(body, context);
  }

  @Post(unlinkStudentAndSubject)
  static unlinkStudentAndSubject(
    @Body() body: Partial<UnlinkStudentAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkStudentAndSubjectResponseBody> {
    return unlinkStudentAndSubjectHandler(body, context);
  }

  @Post(unlinkStudentAndTutor)
  static unlinkStudentAndTutor(
    @Body() body: Partial<UnlinkStudentAndTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkStudentAndTutorResponseBody> {
    return unlinkStudentAndTutorHandler(body, context);
  }

  @Post(unlinkSubjectAndSubjectCategory)
  static unlinkSubjectAndSubjectCategory(
    @Body() body: Partial<UnlinkSubjectAndSubjectCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkSubjectAndSubjectCategoryResponseBody> {
    return unlinkSubjectAndSubjectCategoryHandler(body, context);
  }

  @Post(unlinkSubjects)
  static unlinkSubjects(
    @Body() body: Partial<UnlinkSubjectsRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkSubjectsResponseBody> {
    return unlinkSubjectsHandler(body, context);
  }

  @Post(unlinkTutorAndSubject)
  static unlinkTutorAndSubject(
    @Body() body: Partial<UnlinkTutorAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkTutorAndSubjectResponseBody> {
    return unlinkTutorAndSubjectHandler(body, context);
  }
}
