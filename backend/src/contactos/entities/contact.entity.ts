import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id_contacto: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  categoria: string;

  @Column()
  telefono: number;

  @Column()
  pais: string;

  @Column()
  provincia: string;

  // Otros campos y relaciones aquí
}