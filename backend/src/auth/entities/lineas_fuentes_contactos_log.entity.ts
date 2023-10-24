import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LineasFuentesContactosLog {
  @PrimaryGeneratedColumn()
  id_linea_fuente_contacto_log: number;

  @Column()
  id_linea_fuente: number;

  @Column()
  accion: string;

  @Column()
  resultado: string;

  // Otros campos y relaciones aquí
}