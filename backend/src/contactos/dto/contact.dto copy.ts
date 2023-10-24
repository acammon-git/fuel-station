import { IsEmail, IsString, MaxLength } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateContactDto {

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
