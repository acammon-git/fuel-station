
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { Lineas } from './entities/lineas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class LinesService {

  constructor(
    @InjectRepository(Lineas)
    private linesRepository: Repository<Lineas>,
  ) {}
  async getAllElements() {
    try {
      // Utiliza el repositorio de TypeORM para realizar una consulta y obtener todos los elementos
      const elements = await this.linesRepository.find();
      return elements;
    } catch (error) {
      // Manejo de errores, puedes personalizarlo según tus necesidades
      throw new Error('Error al obtener los elementos');
    }
  }
  async create(createLineDto: CreateLineDto): Promise<Lineas> {
    // Crea una nueva instancia de la entidad Contact
    const { ...lineData } = createLineDto;
    
    const newLine = this.linesRepository.create({
      ...lineData,
    });
    await this.linesRepository.save(newLine);
    const { ...line } = newLine;
    return line;

  }

  async findAll(): Promise<Lineas[]> {
    return this.linesRepository.find();
  }

  async findOne(id: number): Promise<{ message: string } | any> {
    const contact = await this.linesRepository.findOne({ where: { id_linea: id } });

    if (contact) {
      return contact;
    } else {
      return { message: 'Entidad no encontrada' };
    }
  }

  async update(id: number, updateLineaDto: UpdateLineDto): Promise<Lineas | null> {
    // Realiza la lógica para actualizar los datos del usuario
    const line = await this.linesRepository.findOne({ where: { id_linea: id } });

    if (!line) {
      throw new NotFoundException(`La linea con ID ${id} no fue encontrada.`);
    }
    console.log(updateLineaDto);
    // Actualiza los campos que desees del usuario basado en los datos proporcionados en updateAuthDto
    if (updateLineaDto.url) {
      line.url = updateLineaDto.url;
    }

    if (updateLineaDto.nombre) {
      line.nombre = updateLineaDto.nombre;
    }

    if (updateLineaDto.imagen) {
      line.imagen = updateLineaDto.imagen;
    }

    if (updateLineaDto.activo) {
      line.activo = updateLineaDto.activo;
    }
    


    // Guarda los cambios en la base de datos
    await this.linesRepository.save(line);
    // Devuelve el usuario actualizado
    return line;
  }

  async remove(id: number): Promise<{ message: string }> {
    const deletedEntity = await this.linesRepository.delete(id);

    if (deletedEntity.affected === 1) {
      return { message: 'La entidad se eliminó correctamente' };
    } else {
      return { message: 'La entidad no se encontró o no se pudo eliminar' };
    }
  }
}
