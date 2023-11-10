import { PartialType } from '@nestjs/mapped-types';
import { CreateLineDto } from './create-line.dto';
import { IsString, IsEmail, MaxLength, IsNumber } from 'class-validator';

export class UpdateLineDto extends PartialType(CreateLineDto) {
    @IsString()
    nombre: string;

    @IsString()
    url: string;

    @IsString()
    imagen: string;

    @IsNumber()
    activo: number;
}
