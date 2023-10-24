import { PartialType } from '@nestjs/mapped-types';
import { CreateContactFontsLineDto } from './create-contact-fonts-line.dto';
import { IsNumber, IsDate, MaxLength } from 'class-validator';

export class UpdateContactFontsLineDto extends PartialType(CreateContactFontsLineDto) {
    @MaxLength(4)
    id_linea_fuente: number;

    @MaxLength(4)
    id_contacto: number;

    fecha_baja: Date;

    fecha_alta: Date;
}
