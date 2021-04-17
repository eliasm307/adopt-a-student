import * as firebase from 'firebase-admin';
import { Body, Controller, Header, Post, Route, SuccessResponse } from 'tsoa';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { PublicStudentData } from '@adopt-a-student/common';

const fb = firebase;

const data: PublicStudentData = {
  id: "student",
  prefferedLocales: [],
  userName: "",
};

@Route("users")
export class StudentsController extends Controller {
  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: { prop1: string; prop2: number },
    @Header() context: any
  ): Promise<PublicStudentData> {
    // this.setStatus(201); // set return status 201
    // new UsersService().create(requestBody);
    return Promise.resolve(data);
  }
}
