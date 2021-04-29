import { Body, Controller, Hidden, Post, Query, Route } from 'tsoa';

import {
  isLinkedLocaleSubjectData, isTruthyString, LinkStudentAndSubjectRequestBody,
  LinkStudentAndSubjectResponseBody, LinkStudentAndTutorRequestBody,
  LinkStudentAndTutorResponseBody, LinkSubjectAndSubjectCategoryRequestBody,
  LinkSubjectAndSubjectCategoryResponseBody, LinkSubjectsRequestBody, LinkSubjectsResponseBody,
  LinkTutorAndSubjectRequestBody, LinkTutorAndSubjectResponseBody,
  UnlinkStudentAndSubjectRequestBody, UnlinkStudentAndSubjectResponseBody,
  UnlinkStudentAndTutorRequestBody, UnlinkStudentAndTutorResponseBody,
  UnlinkSubjectAndSubjectCategoryRequestBody, UnlinkSubjectAndSubjectCategoryResponseBody,
  UnlinkSubjectsRequestBody, UnlinkSubjectsResponseBody, UnlinkTutorAndSubjectRequestBody,
  UnlinkTutorAndSubjectResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionContext } from '../../declarations/interfaces';
import arrayToRecord from '../../utils/arrayToRecord';
import { functionsHttps } from '../../utils/firebase/firebase-admin';
import verifyRequest from '../../utils/verifyRequest';
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
    const { uid } = verifyRequest(body, context);

    const { data } = body;

    // verify received data
    if (!isLinkedLocaleSubjectData(data))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return linkStudentAndSubjectHandler({ data, uid });
  }

  @Post(linkStudentAndTutor)
  static linkStudentAndTutor(
    @Body() body: Partial<LinkStudentAndTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkStudentAndTutorResponseBody> {
    // todo this should be 2 separate methods ie linkToStudent and linkToTutor, then it will be clear what private data should be returned

    const { uid } = verifyRequest(body, context);

    const { studentId, tutorId } = body;

    // verify received data
    if (
      !studentId ||
      !isTruthyString(studentId) ||
      !tutorId ||
      !isTruthyString(tutorId)
    )
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update tutor because provided data is not valid"
      );

    const userIsStudentOrTutor = studentId === uid || tutorId === uid;

    if (!userIsStudentOrTutor)
      throw new functionsHttps.HttpsError(
        "permission-denied",
        "Logged in user is neither the student or the tutor"
      );

    return linkStudentAndTutorHandler({ studentId, tutorId });
  }

  @Post(linkSubjectAndSubjectCategory)
  static linkSubjectAndSubjectCategory(
    @Body() body: Partial<LinkSubjectAndSubjectCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkSubjectAndSubjectCategoryResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { categoryId, locale, subjectId } = body;

    // verify received data
    if (
      !isTruthyString(categoryId) ||
      !isTruthyString(locale) ||
      !isTruthyString(subjectId)
    )
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return linkSubjectAndSubjectCategoryHandler({
      categoryId,
      locale,
      subjectId,
    });
  }

  @Post(linkSubjects)
  static linkSubjects(
    @Body() body: Partial<LinkSubjectsRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkSubjectsResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { subject1Id, subject2Id } = body;

    // verify received data
    if (!isTruthyString(subject1Id) || !isTruthyString(subject2Id))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return linkSubjectsHandler({ subject1Id, subject2Id });
  }

  @Post(linkTutorAndSubject)
  static linkTutorAndSubject(
    @Body() body: Partial<LinkTutorAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkTutorAndSubjectResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { data } = body;

    // verify received data
    if (!isLinkedLocaleSubjectData(data))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return linkTutorAndSubjectHandler({ data, uid });
  }

  @Post(unlinkStudentAndSubject)
  static unlinkStudentAndSubject(
    @Body() body: Partial<UnlinkStudentAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkStudentAndSubjectResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { country, id, locale } = body;

    // verify received data
    if (
      !isTruthyString(country) ||
      !isTruthyString(id) ||
      !isTruthyString(locale)
    )
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return unlinkStudentAndSubjectHandler({ country, id, locale, uid });
  }

  @Post(unlinkStudentAndTutor)
  static unlinkStudentAndTutor(
    @Body() body: Partial<UnlinkStudentAndTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkStudentAndTutorResponseBody> {
    // ? implement request system, so this would be unlinking a student in what way?
    const { uid } = verifyRequest(body, context);

    const { studentId, tutorId } = body;

    // verify received data
    if (!isTruthyString(studentId) || !isTruthyString(tutorId))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update tutor because provided data is not valid"
      );

    const userIsStudentOrTutor = studentId === uid || tutorId === uid;

    if (!userIsStudentOrTutor)
      throw new functionsHttps.HttpsError(
        "permission-denied",
        "Logged in user is neither the student or the tutor"
      );

    return unlinkStudentAndTutorHandler({ studentId, tutorId, uid });
  }

  @Post(unlinkSubjectAndSubjectCategory)
  static unlinkSubjectAndSubjectCategory(
    @Body() body: Partial<UnlinkSubjectAndSubjectCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkSubjectAndSubjectCategoryResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { categoryId, subjectId } = body;

    // verify received data
    if (!isTruthyString(categoryId) || !isTruthyString(subjectId))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not unlink documents because provided data is not valid"
      );

    return unlinkSubjectAndSubjectCategoryHandler({ categoryId, subjectId });
  }

  @Post(unlinkSubjects)
  static unlinkSubjects(
    @Body() body: Partial<UnlinkSubjectsRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkSubjectsResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { subject1Id, subject2Id } = body;

    // verify received data
    if (!body || !isTruthyString(subject1Id) || !isTruthyString(subject2Id))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return unlinkSubjectsHandler({ subject1Id, subject2Id });
  }

  @Post(unlinkTutorAndSubject)
  static unlinkTutorAndSubject(
    @Body() body: Partial<UnlinkTutorAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkTutorAndSubjectResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { country, id, locale } = body;

    // verify received data
    if (
      !isTruthyString(country) ||
      !isTruthyString(id) ||
      !isTruthyString(locale)
    )
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );
    return unlinkTutorAndSubjectHandler({ country, id, locale, uid });
  }
}
