import { Body, Controller, Header, Post, Route } from 'tsoa';

import { GetStudentsBySubjectsBody, GetStudentsBySubjectsResult } from '../declarations/interfaces';
import getStudentsBySubjectsHandler from '../request-handlers/getStudentsBySubjectsHandler';

/*
const data: GetStudentsBySubjectsResult = {
  data: [
    {
      id: "student",
      prefferedLocales: [],
      userName: "",
    },
  ],
};
*/

@Route("/")
export class StudentsController extends Controller {
  // @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async getStudentsBySubjects(
    @Body() body: GetStudentsBySubjectsBody,
    @Header() context: any
  ): Promise<GetStudentsBySubjectsResult> {
    return getStudentsBySubjectsHandler(body, context);
  }
}
