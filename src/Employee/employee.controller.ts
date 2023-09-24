import { Controller, Get, Post, Delete, Put, Param, Query, Req, Request, Body, UsePipes, ValidationPipe, ParseIntPipe, UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Session,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";

import {  DeleteEmployee } from "./employeeform.dto";
import { EmployeeInfo} from "./createEmployee.dto";
import { ScheduleEntity } from "./scheduleentity.entity";
import { ScheduleTime } from "./nurseSchedule.dto";
import { EmployeeService } from "./employeeservice.service";
import {diskStorage} from 'multer';
import { FileInterceptor } from "@nestjs/platform-express";
import session from "express-session";
import { SessionGuard } from "./employeesession.guard";


@Controller('/employee')
export class EmployeeController
{
  constructor(private employeeservice:EmployeeService ){ }

  @Get("/index")
  getIndex(): any{
      return this.employeeservice.getIndex();
  }
  @Get("/nurse/:id")
  getEmployeeByid(@Param('id', ParseIntPipe) id:number,): any{
      return this.employeeservice.getEmployeeByid(id);
  }
  @Get("/employeeInfo")
  getEmployeeInfo(@Query() qry:any):any{
      return this.employeeservice. getEmployeeInfo(qry);
  }
 

  @Post("/createEmployee")
  @UsePipes(new ValidationPipe())
  CreateEmployee(@Body() mydto:EmployeeInfo):any{
      return this.employeeservice.CreateEmployee(mydto);
  }

  @Put("/updateEmployee")
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  UpdateEmployee(@Session() session,  @Body('name')name: string):any{
     console.log(session.email);
     return this.employeeservice.UpdateEmployee(name, session.email);
  }
  
  

  @Put("/updateEmployee/:id")
  @UsePipes(new ValidationPipe())
  UpdateEmployeebyid(
      @Body() mydto:EmployeeInfo ,
      @Param('id', ParseIntPipe) id: number,
  ): any{
      return this.employeeservice.UpdateEmployeebyid(mydto, id);
  }
  
  @Delete("/deleteEmployee/:id")
  deleteEmployeebyid(@Param("id", ParseIntPipe)id: number):any{
      return this.employeeservice.deleteEmployeebyid(id);
  }

 
 
 
  
  @Post("/signup")
  @UseInterceptors(FileInterceptor('filename',
  {storage: diskStorage({
      destination: './uploads',
      filename: function(req, file, cb){
          cb(null,Date.now()+file.originalname)
      }
  })
}))

signup(@Body() mydto:EmployeeInfo, @UploadedFile(new ParseFilePipe({
  validators: [
      new MaxFileSizeValidator({maxSize: 1600000}),
      new FileTypeValidator({fileType: 'png|jpg|jpeg'}),
  ],
}),) file: Express.Multer.File){
   mydto.filename = file.filename;

   return this.employeeservice.signup(mydto);
   console.log(file)
}

  

  @Get('/signin')
 signin(@Session() session, @Body() mydto:EmployeeInfo)
{
if(this.employeeservice.signin(mydto))
{
session.email = mydto.email;

console.log(session.email);
return {message:"success"};

}

else
{
return {message:"invalid credentials"};
}

}

@Post("/sendMail")
sendEmail(@Body() mydata)
{
  return this.employeeservice.sendEmail(mydata);
}

@Get("/signout")
signout(@Session() session)
{
  if(session.destroy)
  {
      return {message: "you are logged out"}
  }
  else
  {
      throw new UnauthorizedException("invalid actions");
  }
}


// @Post("/createScheduleTime")
//   @UsePipes(new ValidationPipe())
//   createScheduleTime(@Body() mydto:ScheduleTime):any{
//       return this.employeeservice.createScheduleTime(mydto);
//   }
  
// @Put("/updateScheduleTime")

// @UsePipes(new ValidationPipe())
// updateScheduleTime( 
//     @Body('date')date: string,
//     @Body('sunday')sunday: string,
//     @Body('monday')monday: string,
//     @Body('tuesday')tuesday: string,
//     @Body('wednesday')wednesday: string,
//     @Body('thursday')thursday: string,
//     @Body('friday')friday: string,
//     @Body('saturday')saturday: string):any{
   
//    return this.employeeservice.updateScheduleTime(date,sunday,monday,tuesday,wednesday,thursday,friday,saturday);
// }



// @Put("/updateScheduleTime/:id")
// @UsePipes(new ValidationPipe())
// updateScheduleTimeByid(
//     @Body() mydto:ScheduleTime ,
//     @Param('id', ParseIntPipe) id: number,
// ): any{
//     return this.employeeservice.updateScheduleTimeByid(mydto, id);
// }

// @Delete("/ScheduleTime/:id")
// ScheduleTimebyid(@Param("id", ParseIntPipe)id: number):any{
//     return this.employeeservice.ScheduleTimebyid(id);
// }





  




}