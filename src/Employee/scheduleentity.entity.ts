
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,BaseEntity } from 'typeorm';

@Entity("schedule")
export class ScheduleEntity{
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    department: string;

   @Column()
   shiftSchedule: string;

  @Column()
  date: string;

  @Column()
  sunday: string;

  @Column()
  monday: string;

  @Column()
  tuesday: string;

 @Column()
 wednesday: string;

@Column()
thursday: string;

@Column()
friday: string;

@Column()
saturday: string;
  




}