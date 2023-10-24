import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { IsString, IsEmail, MaxLength } from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    categoria: string;

    @MaxLength(9)
    telefono: number;

    @IsString()
    pais: string;

    @IsString()
    provincia: string;
}
