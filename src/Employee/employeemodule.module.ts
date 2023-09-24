import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeController } from "./employee.controller"
import { EmployeeEntity } from "./employeeentity.entity";
import { ScheduleEntity } from "./scheduleentity.entity";

import { EmployeeService } from "./employeeservice.service"
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
                       port: 465,
                       ignoreTLS: true,
                       secure: true,
                       auth: {
                           user: 'ankonsarker17@gmail.com',
                           pass: 'ptwvglbvgqnngdkf'
                       },
                      }
          }),
TypeOrmModule.forFeature([EmployeeEntity])],
controllers: [EmployeeController],
providers: [EmployeeService],

})

export class EmployeeModule {}