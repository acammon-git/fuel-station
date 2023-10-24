
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFontsLineDto } from './dto/create-fonts-line.dto';
import { UpdateFontsLineDto } from './dto/update-fonts-line.dto';
import { LineasFuentes } from './entities/lineas_fuentes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FontsLinesService {

  constructor(
    @InjectRepository(LineasFuentes)
    private fontsLinesRepository: Repository<LineasFuentes>,
  ) { }

  async getAllElements() {
    try {
      // Utiliza el repositorio de TypeORM para realizar una consulta y obtener todos los elementos
      const elements = await this.fontsLinesRepository.find();
      return elements;
    } catch (error) {
      // Manejo de errores, puedes personalizarlo según tus necesidades
      throw new Error('Error al obtener los elementos');
    }
  }

  async create(createFontsLineDto: CreateFontsLineDto): Promise<LineasFuentes> {
    // Crea una nueva instancia de la entidad Contact
    const { ...fontsLineData } = createFontsLineDto;

    const newFontLine = this.fontsLinesRepository.create({
      ...fontsLineData,
    });
    await this.fontsLinesRepository.save(newFontLine);
    const { ...line } = newFontLine;
    return line;

  }

  async findAll(): Promise<LineasFuentes[]> {
    return this.fontsLinesRepository.find();
  }

  async findOne(id: number): Promise<{ message: string } | any> {
    const contact = await this.fontsLinesRepository.findOne({ where: { id_linea: id } });

    if (contact) {
      return contact;
    } else {
      return { message: 'Entidad no encontrada' };
    }
  }

  async update(id: number, updateFontLineDto: UpdateFontsLineDto): Promise<LineasFuentes | null> {
    // Realiza la lógica para actualizar los datos del usuario
    const fontLine = await this.fontsLinesRepository.findOne({ where: { id_linea_fuente: id } });

    if (!fontLine) {
      throw new NotFoundException(`La linea-fuente con ID ${id} no fue encontrada.`);
    }
    console.log(updateFontLineDto);
    // Actualiza los campos que desees del usuario basado en los datos proporcionados en updateAuthDto
    if (updateFontLineDto.nombre_fuente) {
      fontLine.nombre_fuente = updateFontLineDto.nombre_fuente;
    }

    if (updateFontLineDto.parametros) {
      fontLine.parametros = updateFontLineDto.parametros;
    }

    if (updateFontLineDto.imagen) {
      fontLine.imagen = updateFontLineDto.imagen;
    }

    if (updateFontLineDto.activo) {
      fontLine.activo = updateFontLineDto.activo;
    }

    // Guarda los cambios en la base de datos
    await this.fontsLinesRepository.save(fontLine);
    // Devuelve el usuario actualizado
    return fontLine;
  }

  async remove(id: number): Promise<{ message: string }> {
    const deletedEntity = await this.fontsLinesRepository.delete(id);

    if (deletedEntity.affected === 1) {
      return { message: 'La entidad se eliminó correctamente' };
    } else {
      return { message: 'La entidad no se encontró o no se pudo eliminar' };
    }
  }
}
