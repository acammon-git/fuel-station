import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lineas {
  @PrimaryGeneratedColumn()
  id_linea: number;

  @Column()
  nombre: string;

  @Column()
  url: string;

  @Column()
  imagen: string;

  @Column()
  activo: number;

}