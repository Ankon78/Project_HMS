import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import { query } from "express";
import { DTOs } from "./nursedtos.dto";
import { NurseEntity } from "./nurseentity.entity";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import {NurseInfo} from "./createNurse.dto";

@Injectable()
export class NurseService{

    constructor(
        @InjectRepository(NurseEntity)
       
        private nurseRepo: Repository<NurseEntity>,
        
        

       private mailerService: MailerService

    ){}

    getIndex():any{
        return this.nurseRepo.find();
    }
    async getNurseByid(id) {
        const data=await this.nurseRepo.findOneBy({ id });
        console.log(data);
        if(data!==null) {
            return data;
        }
       else 
       {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
       }
    
    }
    
    getNurseByIDName(qry):any{
        return this.nurseRepo.findOneBy({id:qry.id,name:qry.name});
    }
   
    async CreateNurse(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
         return this.nurseRepo.save(mydto);
        }
   
    UpdateNurse(name: string,id: any):any {
        console.log(name+id);
        return this.nurseRepo.update(id,{name:name});
        }

    updateNursebyid(mydto:NurseInfo, id):any{
        return this.nurseRepo.update(id,mydto);
    }

    deleteNursebyid(id):any{
        return this.nurseRepo.delete(id);
    }


    async signup(mydto){
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.nurseRepo.save(mydto);
    }

    // async signin(mydto){
    //     console.log(mydto.password);
    // const mydata =  await this.nurseRepo.findOneBy({email: mydto.email});
    // const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    // if(isMatch){
    //     return 1;
    // }
    // else{
    //     return 0;
    // }
    // }

    async signin(mydto:NurseInfo): Promise<boolean> {
        // Implement your authentication logic here
        // Example: Check if the email and password match in the database
    
        return mydto.email === 'example@example.com' && mydto.password === 'password';
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

      async logout(): Promise<void> {
        // Implement your logout logic here
        // For example, clear any user tokens or session data
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
}