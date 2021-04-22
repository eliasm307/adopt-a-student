import { UpdateStudentRequestBody, UpdateStudentResponseBody } from '@adopt-a-student/common';

import studentDataUpdater from '../../../utils/data-updaters/studentDataUpdater';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

  updateStudent,
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
  `enum: ${CallableName.getStudentsBySubjects.toString()} enumCustom: ${custom.val1.toString()}`
);

const enumv = CallableName.getStudentsBySubjects.toString() + "/";
*/
// hide props decorator https://tsoa-community.github.io/docs/decorators.html#hidden

@Route("/")
export class StudentsController extends Controller {
  static callableNames = exportedNames;
  static callableNamesMap = arrayToRecord([...exportedNames]);
  /*
  static callableNames = Object.keys(namedKeys).reduce(
    (acc, name) => ({ ...acc, [name]: name }),
    {} as Record<keyof typeof namedKeys, keyof typeof namedKeys>
  );
  */
  static id = "Students";

  @Post(createStudent)
  static createStudent(
    @Body() body: Partial<CreateStudentRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<CreateStudentResponseBody> {
    if (!body)
      throw new functionsHttps.HttpsError(
        "invalid-argument",
        "body data not provided"
      );

    return createStudentHandler(body, context);
  }

  /**
   * Retreives data about a student user. If the student user owns the data then they get all the data, otherwise it is restricted to 'public' data.
   * @param body
   * @param context
   * @returns
   */
  @Post(getStudent)
  static getStudent(
    @Body() body: Partial<GetStudentRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetStudentResponseBody> {
    const { uid } = verifyRequest(body, context);

    const { id } = body;

    return uid === id
      ? getPrivateStudentData({ id, uid })
      : getPublicStudentData({ id, uid });
  }

  @Post(getStudentsBySubjects)
  static getStudentsBySubjects(
    @Body() body: Partial<GetStudentsBySubjectsRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<GetStudentsBySubjectsResponseBody> {
    return getStudentsBySubjectsHandler(body, context);
  }

  @Post(updateStudent)
  static updateStudent(
    @Body() body: Partial<UpdateStudentRequestBody>,
    @Query() @Hidden() context: FirebaseCallableFunctionContext = {} as any
  ): Promise<UpdateStudentResponseBody> {
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

    return updateStudentHandler(body, context);
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
