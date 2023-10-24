import { PartialType } from '@nestjs/mapped-types';
import { CreateFontsLineDto } from './create-fonts-line.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdateFontsLineDto extends PartialType(CreateFontsLineDto) {
    @IsString()
    nombre_fuente: string;

    @IsString()
    parametros: string;

    @IsString()
    imagen: string;

    @MaxLength(1)
    activo: number;
}
