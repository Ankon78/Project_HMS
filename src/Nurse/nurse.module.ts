import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {NurseEntity} from "./nurseentity.entity";
import { NurseController } from "./nurse.controller";
import { NurseService } from "./nurseservice.service";


@Module({
   imports: [TypeOrmModule.forFeature([NurseEntity])],
   

    //imports: [TypeOrmModule.forFeature([AdminEntity, PackageEntity, AnalystEntity])],
    
    controllers: [NurseController],
    providers: [NurseService],
})

export class NurseModule{}

