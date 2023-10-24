import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactFontsLineDto } from './dto/create-contact-fonts-line.dto';
import { UpdateContactFontsLineDto } from './dto/update-contact-fonts-line.dto';
import { LineasFuentesContactos } from './entities/lineas_fuentes_contactos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactFontsLinesService {

  constructor(
    @InjectRepository(LineasFuentesContactos)
    private contactFontsLinesRepository: Repository<LineasFuentesContactos>,
  ) { }

  async getAllElements() {
    try {
      // Utiliza el repositorio de TypeORM para realizar una consulta y obtener todos los elementos
      const elements = await this.contactFontsLinesRepository.find();
      return elements;
    } catch (error) {
      // Manejo de errores, puedes personalizarlo según tus necesidades
      throw new Error('Error al obtener los elementos');
    }
  }

  async create(createContactFontsLineDto: CreateContactFontsLineDto): Promise<LineasFuentesContactos> {
    // Crea una nueva instancia de la entidad Contact
    const { ...contactFontLineData } = createContactFontsLineDto;

    const newContactFontLine = this.contactFontsLinesRepository.create({
      ...contactFontLineData,
    });
    await this.contactFontsLinesRepository.save(newContactFontLine);
    const { ...contactFontLine } = newContactFontLine;
    return contactFontLine;

  }

  async findAll(): Promise<LineasFuentesContactos[]> {
    return this.contactFontsLinesRepository.find();
  }

  async findOne(id: number): Promise<{ message: string } | any> {
    const contact = await this.contactFontsLinesRepository.findOne({ where: { id_linea_fuente_contacto: id } });

    if (contact) {
      return contact;
    } else {
      return { message: 'Entidad no encontrada' };
    }
  }

  async update(id: number, updateContactFontsLineDto: UpdateContactFontsLineDto): Promise<LineasFuentesContactos | null> {
    // Realiza la lógica para actualizar los datos del usuario
    const contactFontLine = await this.contactFontsLinesRepository.findOne({ where: { id_linea_fuente_contacto: id } });

    if (!contactFontLine) {
      throw new NotFoundException(`El contacto-fuente-linea con ID ${id} no fue encontrada.`);
    }
    console.log(updateContactFontsLineDto);
    // Actualiza los campos que desees del usuario basado en los datos proporcionados en updateAuthDto
    if (updateContactFontsLineDto.fecha_baja) {
      contactFontLine.fecha_baja = updateContactFontsLineDto.fecha_baja;
    }

    if (updateContactFontsLineDto.fecha_alta) {
      contactFontLine.fecha_alta = updateContactFontsLineDto.fecha_alta;
    }

    // Guarda los cambios en la base de datos
    await this.contactFontsLinesRepository.save(contactFontLine);
    // Devuelve el usuario actualizado
    return contactFontLine;
  }

  async remove(id: number): Promise<{ message: string }> {
    const deletedEntity = await this.contactFontsLinesRepository.delete(id);

    if (deletedEntity.affected === 1) {
      return { message: 'La entidad se eliminó correctamente' };
    } else {
      return { message: 'La entidad no se encontró o no se pudo eliminar' };
    }
  }
}
