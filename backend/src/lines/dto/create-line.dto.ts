import { IsString, IsEmail, MaxLength } from "class-validator";

export class CreateLineDto {
    @IsString()
    nombre: string;

    @IsString()
    url: string;

    @IsString()
    imagen: string;

    @MaxLength(1)
    activo: number;
}
