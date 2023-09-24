
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,BaseEntity } from 'typeorm';

@Entity("nurse")
export class NurseEntity{
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

   @Column()
   email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  filename:string;

  




}