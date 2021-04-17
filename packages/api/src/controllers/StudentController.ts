/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa';

import { PublicStudentData } from '../../common/src';

const data: PublicStudentData = {
  id: "student",
  prefferedLocales: [],
  userName: "",
};

@Route("users")
export class StudentsController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<PublicStudentData> {
    return Promise.resolve(data);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: { prop1: string; prop2: number }
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    // new UsersService().create(requestBody);
    return;
  }
}
