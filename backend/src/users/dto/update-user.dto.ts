import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsString, MinLength, IsEmail, MaxLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    nombre: string;

    password: string;
    
    email: string;

    telefono:number;

    @IsString()
    pais: string;
    
    last_login: Date;

    @IsString()
    foto: string;

    activo:boolean;
}
