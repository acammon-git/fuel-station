import { IsDate, IsNumber, IsString, MaxLength} from "class-validator";

export class CreateContactFontsLineDto {

    @MaxLength(4)
    id_linea_fuente: number;

    @MaxLength(4)
    id_contacto: number;
    
    @IsString()
    fecha_baja: Date;

    fecha_alta: Date;
}
