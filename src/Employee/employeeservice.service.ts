import { Injectable } from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import { query } from "express";
import {  DeleteEmployee } from "./employeeform.dto";
import { EmployeeEntity } from "./employeeentity.entity";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import { EmployeeInfo} from "./createEmployee.dto";
import { ScheduleTime } from "./nurseSchedule.dto";
import { ScheduleEntity } from "./scheduleentity.entity";

@Injectable()
export class EmployeeService{

    constructor(
        @InjectRepository(EmployeeEntity)
        private employeeRepo: Repository<EmployeeEntity>,
        
        // @InjectRepository(ScheduleEntity)
        // private scheduleRepo: Repository<ScheduleEntity>,

       private mailerService: MailerService

    ){}

    getIndex():any{
        return this.employeeRepo.find();
    }
    getEmployeeByid(id):any{
        return this.employeeRepo.findOneBy({id});
    }
    getEmployeeInfo(qry):any{
        return this.employeeRepo.findOneBy({id:qry.id,name:qry.name});
    }
   
    CreateEmployee(mydto:EmployeeInfo):any{
        const employeeInfo = new EmployeeEntity()
        employeeInfo.name = mydto.name;
        employeeInfo.email = mydto.email;
        employeeInfo.password = mydto.password;
        employeeInfo.address = mydto.address;
       return this.employeeRepo.save(employeeInfo);
    }
    UpdateEmployee(name, email):any{
        return this.employeeRepo.update({email:email}, {name:name});
    }

    UpdateEmployeebyid(mydto:EmployeeInfo, id):any{
        return this.employeeRepo.update(id,mydto);
    }

    deleteEmployeebyid(id):any{
        return this.employeeRepo.delete(id);
    }


    async signup(mydto){
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.employeeRepo.save(mydto);
    }

    async signin(mydto){
        console.log(mydto.password);
    const mydata =  await this.employeeRepo.findOneBy({email: mydto.email});
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if(isMatch){
        return 1;
    }
    else{
        return 0;
    }
    }

    async signout(session: Record<string, any>): Promise<{ message: string }> {
        return new Promise((resolve, reject) => {
          session.destroy((err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve({ message: 'You are logged out' });
            }
          });
        });
      }

    async sendEmail(mydata)
    {
        console.log(mydata.email)
        return await this.mailerService.sendMail({
            to: mydata.email,
            subject: mydata.subject,
            text: mydata.text,
        });
    }


    // createScheduleTime(mydto:ScheduleTime):any{
    //     const scheduleTime = new ScheduleEntity()
    //     scheduleTime.department = mydto.department;
    //     scheduleTime.shiftSchedule = mydto.shiftSchedule;
    //     scheduleTime.date = mydto.date;
    //     scheduleTime.sunday = mydto.sunday;
    //     scheduleTime.monday = mydto.monday;
    //     scheduleTime.tuesday = mydto.tuesday;
    //     scheduleTime.wednesday = mydto.wednesday;
    //     scheduleTime.thursday = mydto.thursday;
    //     scheduleTime.friday = mydto.friday;
    //     scheduleTime.saturday = mydto.saturday;
    //    return this.scheduleRepo.save(scheduleTime);
    // }
    
    // updateScheduleTime(date, sunday, monday, tuesday, wednesday, thursday, friday, saturday): any {
    //     const updatedSchedule = {
    //       date: date,
    //       sunday: sunday,
    //       monday: monday,
    //       tuesday: tuesday,
    //       wednesday: wednesday,
    //       thursday: thursday,
    //       friday: friday,
    //       saturday: saturday
    //     };
    //     return this.scheduleRepo.update({ date: date }, updatedSchedule);
    //   }
      

    // updateScheduleTimeByid(mydto:ScheduleTime, id):any{
    //     return this.scheduleRepo.update(id,mydto);
    // }

    // ScheduleTimebyid(id):any{
    //     return this.scheduleRepo.delete(id);
    // }

}