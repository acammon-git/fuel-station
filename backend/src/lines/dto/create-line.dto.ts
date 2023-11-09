import { IsString, IsEmail, MaxLength, IsNumber } from "class-validator";

export class CreateLineDto {
    @IsString()
    nombre: string;

    @IsString()
    url: string;

    @IsString()
    imagen: string;

    @IsNumber()
    activo: number;
}
