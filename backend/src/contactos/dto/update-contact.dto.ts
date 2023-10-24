import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
<<<<<<< HEAD
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
=======

export class UpdateContactoDto extends PartialType(CreateContactDto) {}
>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684
