import { Injectable } from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import { EmployeeForm,EmployeeLogin,EmployeeRegistration,EmployeeInsert,UpdateEmployee,DeleteEmployee } from "./employeeform.dto";
import { EmployeeEntity } from "./employeeentity.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private EmployeeRepo: Repository<EmployeeEntity>,
        
        private mailerService: MailerService
    ){}

    getIndex():any {
        return this.EmployeeRepo.find();
    }

    getUserByID(id):any{
        return this.EmployeeRepo.findOneBy({id});
    }

    getUserByName(qry):any {
    
        return this.EmployeeRepo.findOneBy({ id:qry.id,name:qry.name });
    }

    getPatientList():any {
        return this.EmployeeRepo.find();
    }


    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.EmployeeRepo.save(mydto);
        }
        
    async signin(mydto){
            console.log(mydto.password);
        const mydata= await this.EmployeeRepo.findOneBy({email: mydto.email});
        const isMatch= await bcrypt.compare(mydto.password, mydata.password);
        if(isMatch) {
        return 1;
        }
        else {
            return 0;
        }
        
        }
        
    async sendEmail(mydata){
         return   await this.mailerService.sendMail({
                to: mydata.email,
                subject: mydata.subject,
                text: mydata.text, 
              });
        
        }
    registrationEmp(mydto:EmployeeRegistration): any {
        const EmployeeRegistration = new EmployeeEntity()
        EmployeeRegistration.name = mydto.name;
        EmployeeRegistration.password = mydto.password;
        EmployeeRegistration.email = mydto.email;
        EmployeeRegistration.phone = mydto.phone;
        EmployeeRegistration.address = mydto.address;
        return this.EmployeeRepo.save(EmployeeRegistration);
    }

    // addsalary(mydto:addsalary):any{
    //     const EmployeeRegistration = new EmployeeEntity()
    //     EmployeeRegistration.name = mydto.name;
    //     EmployeeRegistration.password = mydto.password;
    //     return this.addsalaryRepo.save(EmployeeRegistration);
    // }

        
    updateEmployee(name,email):any {
        return this.EmployeeRepo.update({name:name},{email:email});
    }

    updateEmployeebyid(mydto:UpdateEmployee,id):any {
        return this.EmployeeRepo.update(id,mydto);
    }

    deleteEmployeebyid(id):any {

        return this.EmployeeRepo.delete(id);
    }

}