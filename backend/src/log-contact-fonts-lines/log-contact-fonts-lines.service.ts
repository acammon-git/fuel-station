import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogContactFontsLineDto } from './dto/create-log-contact-fonts-line.dto';
import { UpdateLogContactFontsLineDto } from './dto/update-log-contact-fonts-line.dto';
import { LineasFuentesContactosLog } from './entities/lineas_fuentes_contactos_log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class LogContactFontsLinesService {

  constructor(
    @InjectRepository(LineasFuentesContactosLog)
    private logContactFontsLinesRepository: Repository<LineasFuentesContactosLog>,
  ) { }

  async getAllElements() {
    try {
      // Utiliza el repositorio de TypeORM para realizar una consulta y obtener todos los elementos
      const elements = await this.logContactFontsLinesRepository.find();
      return elements;
    } catch (error) {
      // Manejo de errores, puedes personalizarlo según tus necesidades
      throw new Error('Error al obtener los elementos');
    }
  }

  async create(createLogContactFontsLineDto: CreateLogContactFontsLineDto): Promise<LineasFuentesContactosLog> {
    // Crea una nueva instancia de la entidad Contact
    const { ...logContactFontLineData } = createLogContactFontsLineDto;

    const newLogContactFontLine = this.logContactFontsLinesRepository.create({
      ...logContactFontLineData,
    });
    await this.logContactFontsLinesRepository.save(newLogContactFontLine);
    const { ...logContactFontLine } = newLogContactFontLine;
    return logContactFontLine;

  }

  async findAll(): Promise<LineasFuentesContactosLog[]> {
    return this.logContactFontsLinesRepository.find();
  }

  async findOne(id: number): Promise<{ message: string } | any> {
    const contact = await this.logContactFontsLinesRepository.findOne({ where: { id_linea_fuente_contacto_log: id } });

    if (contact) {
      return contact;
    } else {
      return { message: 'Entidad no encontrada' };
    }
  }

  async update(id: number, updateLogContactFontsLineDto: UpdateLogContactFontsLineDto): Promise<LineasFuentesContactosLog | null> {
    // Realiza la lógica para actualizar los datos del usuario
    const log = await this.logContactFontsLinesRepository.findOne({ where: { id_linea_fuente_contacto_log: id } });

    if (!log) {
      throw new NotFoundException(`El registro con ID ${id} no fue encontrada.`);
    }
    console.log(updateLogContactFontsLineDto);
    // Actualiza los campos que desees del usuario basado en los datos proporcionados en updateAuthDto
    if (updateLogContactFontsLineDto.accion) {
      log.accion = updateLogContactFontsLineDto.accion;
    }

    if (updateLogContactFontsLineDto.resultado) {
      log.resultado = updateLogContactFontsLineDto.resultado;
    }

    

    // Guarda los cambios en la base de datos
    await this.logContactFontsLinesRepository.save(log);
    // Devuelve el usuario actualizado
    return log;
  }

  async remove(id: number): Promise<{ message: string }> {
    const deletedEntity = await this.logContactFontsLinesRepository.delete(id);

    if (deletedEntity.affected === 1) {
      return { message: 'La entidad se eliminó correctamente' };
    } else {
      return { message: 'La entidad no se encontró o no se pudo eliminar' };
    }
  }
}

