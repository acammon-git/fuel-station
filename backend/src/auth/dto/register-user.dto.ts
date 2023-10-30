import { IsBoolean, IsDate, IsEmail, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';



export class RegisterUserDto {

    @IsString()
    nombre: string;

    
    password: string;

    @IsEmail()
    email: string;

    @MaxLength(9)
    telefono:number;

    @IsString()
    pais: string;

    
    last_login: Date;

    @IsString()
    foto: string;

    activo:boolean;

}
