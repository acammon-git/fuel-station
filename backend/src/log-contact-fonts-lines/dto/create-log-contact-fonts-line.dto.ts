import { MaxLength, IsString } from "class-validator";

export class CreateLogContactFontsLineDto {
    @MaxLength(4)
    id_linea_fuente: number;

    @IsString()
    accion: string;

    @IsString()
    resultado: string;
}
