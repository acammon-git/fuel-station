import { IsString, MaxLength } from "class-validator";

export class CreateFontsLineDto {
    @MaxLength(4)
    id_linea: number;

    @IsString()
    nombre_fuente: string;

    @IsString()
    parametros: string;

    @IsString()
    imagen: string;

    @MaxLength(1)
    activo: number;
}
