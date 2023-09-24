import { IsString, Length,MinLength ,MaxLength,Matches ,IsEmail, IsNotEmpty, IsNumber} from 'class-validator';

export class ScheduleTime{
    @IsString()
    department: string;

    @IsString()
  shiftSchedule: string;

  @IsString()
  date: string;

  @IsString()
  sunday: string;

  @IsString()
  monday: string;

  @IsString()
  tuesday: string;

  @IsString()
  wednesday: string;

  @IsString()
  thursday: string;

  @IsString()
  friday: string;

  @IsString()
  saturday: string;
    
    
}