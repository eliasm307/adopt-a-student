import {
  LinkTutorAndSubjectRequestBody, LinkTutorAndSubjectResponseBody,
} from '@adopt-a-student/common';

import linkDocuments from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';
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
    // verify received data
    if (!body || !body.data || !isLinkedLocaleSubjectData(data))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return linkStudentAndSubjectHandler(body, context);
  }

  @Post(linkStudentAndTutor)
  static linkStudentAndTutor(
    @Body() body: Partial<LinkStudentAndTutorRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkStudentAndTutorResponseBody> {
    // verify received data
    if (!body || !body.studentId || !body.tutorId)
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

    return linkStudentAndTutorHandler(body, context);
  }

  @Post(linkSubjectAndSubjectCategory)
  static linkSubjectAndSubjectCategory(
    @Body() body: Partial<LinkSubjectAndSubjectCategoryRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkSubjectAndSubjectCategoryResponseBody> {
    // verify received data
    if (!body || !body.categoryId || !body.subjectId)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return linkSubjectAndSubjectCategoryHandler(body, context);
  }

  @Post(linkSubjects)
  static linkSubjects(
    @Body() body: Partial<LinkSubjectsRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkSubjectsResponseBody> {
    // verify received data
    if (!body || !body.subject1Id || !body.subject2Id)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return linkSubjectsHandler(body, context);
  }

  @Post(linkTutorAndSubject)
  static linkTutorAndSubject(
    @Body() body: Partial<LinkTutorAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<LinkTutorAndSubjectResponseBody> {
    // verify received data
    if (!body || !body.data || !isLinkedLocaleSubjectData(data))
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

    return linkTutorAndSubjectHandler(body, context);
  }

  @Post(unlinkStudentAndSubject)
  static unlinkStudentAndSubject(
    @Body() body: Partial<UnlinkStudentAndSubjectRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UnlinkStudentAndSubjectResponseBody> {
    // verify received data
    if (!body || !body.id)
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not link documents because provided data is not valid"
      );

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
