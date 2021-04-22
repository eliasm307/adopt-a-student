import { UpdateTutorRequestBody, UpdateTutorResponseBody } from '@adopt-a-student/common';

import tutorDataUpdater from '../../../utils/data-updaters/tutorDataUpdater';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';
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
    @Body() body: CreateTutorRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateTutorResponseBody> {
    return createTutorHandler(body, context);
  }

  /**
   * Retreives data about a tutor user. If the tutor user owns the data then they get all the data, otherwise it is restricted to 'public' data.
   * @param body
   * @param context
   * @returns
   */
  @Post(getTutor)
  static getTutor(
    @Body() body: GetTutorRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetTutorResponseBody> {
    const { id } = body;
    const { uid } = verifyRequest(body, context);

    return uid === id
      ? getPrivateTutorData(body, context)
      : getPublicTutorData(body, context);
  }

  @Post(getTutorsBySubjects)
  static getTutorsBySubjects(
    @Body() body: GetTutorsBySubjectsRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetTutorsBySubjectsResponseBody> {
    return getTutorsBySubjectsHandler(body, context);
  }

  @Post(updateTutor)
  static updateTutor(
    @Body() body: UpdateTutorRequestBody,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateTutorResponseBody> {
    // verify received data
    if (
      !body ||
      !body.updates ||
      typeof body.updates !== "object" ||
      !Object.keys(body.updates).length
    )
      throw new functionsHttps.HttpsError(
        "failed-precondition",
        "Could not update tutor because provided data is not valid"
      );

    return updateTutorHandler(body, context);
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
