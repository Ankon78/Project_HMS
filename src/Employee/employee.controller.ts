import { Controller,Body,Delete,Put, Get, Param, ParseIntPipe,Query,Post,UsePipes,ValidationPipe,Session, UseGuards, UseInterceptors, MaxFileSizeValidator, FileTypeValidator, UploadedFile, ParseFilePipe } from "@nestjs/common"; 
import {EmployeeForm,EmployeeLogin,EmployeeRegistration,EmployeeInsert,UpdateEmployee,DeleteEmployee} from "./employeeform.dto";
import { EmployeeService} from "./employeeservice.service";
import { SessionGuard } from './employeesession.guard';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller("/Employee")

export class EmployeeController
{
    constructor (private emoloyeeservice:EmployeeService){}
    @Get("/index")
    getEmployee():any{
        return this.emoloyeeservice.getIndex();
    }

    @Get("/:id")
    getUserById(@Param("id",ParseIntPipe) id:number):any{
        return this.emoloyeeservice.getUserByID(id);
    }

    @Get("/finduser")
    getUserByName(@Query() qry:any): any{
        return this.emoloyeeservice.getUserByName(qry);
    }
    @Get("/patientList")
    getPatientList():any{
      return this.emoloyeeservice.getPatientList();
    }

    // @Post("/addsalary")
    // @UsePipes(new ValidationPipe())
    // addsalary(@Body() mydto:addsalary):any{
    //     return this.emoloyeeservice.addsalary(mydto);
    // }

   
    @Post('/signupEmployee')
    @UseInterceptors(FileInterceptor('filename',
    {storage:diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
      }
    })

    }))
    signup(@Body() mydto:EmployeeRegistration,@UploadedFile(  new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 16000000 }),
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){

    mydto.filename = file.filename;  

    return this.emoloyeeservice.signup(mydto);
    console.log(file)
    }
    @Get('/signin')
    signin(@Session() session, @Body() mydto:EmployeeRegistration)
    {
    if(this.emoloyeeservice.signin(mydto))
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
    @Get('/signout')
    signout(@Session() session)
    {
      if(session.destroy())
      {
        return {message:"you are logged out"};
      }
      else
      {
        throw new UnauthorizedException("invalid actions");
      }
    }
    @Post('/sendemail')
    sendEmail(@Body() mydata){
    return this.emoloyeeservice.sendEmail(mydata);
    }

    @Post("/registration")
    @UsePipes(new ValidationPipe())
    registrationEmp(
      @Body() mydto:EmployeeRegistration
    ): any {
      return this.emoloyeeservice.registrationEmp(mydto);
    }

    @Put("/updateEmployee/")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe()
    )
    updateEmployee(@Session() session,@Body('name') name: string): any {
      console.log(session.email);
      return this.emoloyeeservice.updateEmployee(name, session.email);
    }
    
    @Put("/updateEmployee/:id")
    @UsePipes(new ValidationPipe())
    updateEmployeebyid( 
      @Body() mydto:UpdateEmployee, 
      @Param("id", ParseIntPipe) id:number
      ): any {
    return this.emoloyeeservice.updateEmployeebyid(mydto,id);
    }

    @Delete("/deleteEmployee/:id")
    deleteEmployeebyid( 
     @Param("id", ParseIntPipe) id:number,
      ): any {
    return this.emoloyeeservice.deleteEmployeebyid(id);
    }
}
