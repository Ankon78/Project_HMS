import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, Length, Matches, MaxLength, MinLength } from "class-validator";


export class EmployeeForm {   
   
    @IsNotEmpty({message: "Please enter your id"}) 
    @IsInt()
    id: number;

    @IsNotEmpty({message: "Please enter your id"})
    @Length(3,8)
    name: string;
    patientid: number;
    patientname: string;
    username: string;
}

export class EmployeeLogin {
    @IsNotEmpty({message: "Please insert your name"})
    @IsString({message: "Name here string type"})
    name: string;

    @IsNotEmpty({message: "Please insert your password"})
    
    password: string;
}

export class EmployeeRegistration {
    @IsString()
    @Length(5,20)
    name: string;

    @IsEmail()
    email: string;

    
    // @IsNotEmpty()
    // @IsString()
    // @MinLength(4)
    // @MaxLength(20)
    @Length(3,8)
    password: string;

    
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @Length(3,30)
    address: string;

    filename: string;
}

export class EmployeeInsert {
    @IsNotEmpty({message: "Please enter your id"}) 
    @IsInt()
    id: number;

    @IsNotEmpty({message: "Name must be insert"})
    @Length(3,20)
    @IsString({message: "Name here string type"})
    name: string;
}

export class UpdateEmployee {
    id:number;

    @IsString()
    @Length(5,20)
    name: string;

    @IsEmail()
    email: string;

    
    @IsString()
    password: string;

    
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @Length(3,30)
    address: string;

    filename: string;
}

export class DeleteEmployee {
    @IsNotEmpty({message: "Please enter your id"}) 
    @IsInt()
    id: number;
}