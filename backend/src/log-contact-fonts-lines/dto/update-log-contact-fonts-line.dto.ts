import { PartialType } from '@nestjs/mapped-types';
import { CreateLogContactFontsLineDto } from './create-log-contact-fonts-line.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdateLogContactFontsLineDto extends PartialType(CreateLogContactFontsLineDto) {
    @MaxLength(4)
    id_linea_fuente: number;

    @IsString()
    accion: string;

    @IsString()
    resultado: string;
}
