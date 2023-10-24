import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LineasFuentesContactos {
  @PrimaryGeneratedColumn()
  id_linea_fuente_contacto: number;

  @Column()
  id_linea_fuente: number;

  @Column()
  id_contacto: number;

  @Column()
  fecha_baja: Date;

  @Column()
  fecha_alta: Date;

  // Otros campos y relaciones aquí
}