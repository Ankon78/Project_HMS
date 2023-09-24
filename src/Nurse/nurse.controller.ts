import { Controller, Get, Post, Delete, Put, Param, Query, Req, Request, Body, UsePipes, ValidationPipe, ParseIntPipe, UploadedFile,
    UseInterceptors,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    Session,
    UnauthorizedException,
    UseGuards,
    Res
 } from "@nestjs/common";

 import {  DTOs } from "./nursedtos.dto";
 import { NurseInfo} from "./createNurse.dto";
 
 import { NurseService } from "./nurseservice.service";
 import {diskStorage} from 'multer';
 import { FileInterceptor } from "@nestjs/platform-express";
import session from "express-session";
import { SessionGuard } from "./nursesession.guard";


 @Controller('/nurse')
 export class NurseController
 {
    constructor(private nurseservice:NurseService ){ }

    @Get("/index")
    getIndex(): any{
        return this.nurseservice.getIndex();
    }
    @Get("/findnurse/:id")
    getNurseByid(@Param('id', ParseIntPipe) id:number,): any{
        return this.nurseservice.getNurseByid(id);
    }
    @Get("/findnurse")
    getNurseByIDName(@Query() qry: any): any {
        return this.nurseservice.getNurseByIDName(qry);
      }
   

    @Post("/createNurse")
    @UseInterceptors(FileInterceptor('filename',
    {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  }))
  CreateNurse(@Body() mydto:NurseInfo,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 360000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filename = file.filename;  
  console.log(mydto)
  return this.nurseservice.CreateNurse(mydto);
  }

    @Put("/updateNurse")
   // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    UpdateNurse(@Session() session,  @Body('name')name: string, @Body('id') id: string):any{
      // console.log(session.email);
      //  return this.nurseservice.UpdateNurse(name, session.email);
      return this.nurseservice.UpdateNurse(name, id);
    }
    
    

    @Put("/updateNurse/:id")
    @UsePipes(new ValidationPipe())
    updateNursebyid(
        @Body() mydto:NurseInfo ,
        @Param('id', ParseIntPipe) id: number,
    ): any{
        return this.nurseservice.updateNursebyid(mydto, id);
    }
    
    @Delete("/deletenurse/:id")
    deleteNursebyid(@Param("id", ParseIntPipe)id: number):any{
        return this.nurseservice.deleteNursebyid(id);
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }

   
    
    @Post("/signup")
    @UseInterceptors(FileInterceptor('myfile',
    {storage: diskStorage({
        destination: './uploads',
        filename: function(req, file, cb){
            cb(null,Date.now()+file.originalname)
        }
    })
}))

signup(@Body() mydto:NurseInfo, @UploadedFile(new ParseFilePipe({
    validators: [
        new MaxFileSizeValidator({maxSize: 1600000}),
        new FileTypeValidator({fileType: 'png|jpg|jpeg'}),
    ],
}),) file: Express.Multer.File){
     mydto.filename = file.filename;

     return this.nurseservice.signup(mydto);
     console.log(file)
}

    

//     @Get('/signin')
//    signin(@Session() session, @Body() mydto:NurseInfo)
// {
// if(this.nurseservice.signin(mydto))
// {
//   // session.email = mydto.email;

//   // console.log(session.email);
//   return {message:"success"};

// }

// else
// {
//   return {message:"invalid credentials"};
// }
 
// }

@Post("/signin")
async signin(@Body() mydto:NurseInfo): Promise<{ message: string }> {
  if (await this.nurseservice.signin(mydto)) {
    return { message: 'success' };
  } else {
    return { message: 'invalid credentials' };
  }
}


@Post("/sendMail")
sendEmail(@Body() mydata)
{
    return this.nurseservice.sendEmail(mydata);
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

@Post("/logout")
  async logout(): Promise<{ message: string }> {
    await this.nurseservice.logout();
    return { message: 'Logged out successfully' };
  }

    
    
    




 }