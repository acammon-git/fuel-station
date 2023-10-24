import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LineasFuentes {
  @PrimaryGeneratedColumn()
  id_linea_fuente: number;

  @Column()
  id_linea: number;

  @Column()
  nombre_fuente: string;

  @Column()
  parametros: string;

  @Column()
  imagen: string;

  @Column()
  activo: number;

}