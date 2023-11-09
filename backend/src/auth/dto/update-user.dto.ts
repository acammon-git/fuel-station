import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsString, MinLength, IsEmail, MaxLength, IsNumber } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateUserDto) {
    @IsString()
    nombre: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsNumber()
    telefono:number;

    @IsString()
    pais: string;

    
    last_login: Date;

    @IsString()
    foto: string;

    activo:boolean;
}
