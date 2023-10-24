
import { BadRequestException, Body, Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) { }
  async getAllElements() {
    try {
      // Utiliza el repositorio de TypeORM para realizar una consulta y obtener todos los elementos
      const elements = await this.contactRepository.find();
      return elements;
    } catch (error) {
      // Manejo de errores, puedes personalizarlo según tus necesidades
      throw new Error('Error al obtener los elementos');
    }
  }
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    // Crea una nueva instancia de la entidad Contact
    const { email, ...contactData } = createContactDto;
    const existinContact = await this.contactRepository.findOne({ where: { email } });
    if (existinContact) {
      throw new BadRequestException(`El email ${email} ya existe.`);
    }
    const newContact = this.contactRepository.create({
      email, ...contactData,
    });
    await this.contactRepository.save(newContact);
    const { ...contact } = newContact;
    return contact;
    
  }
  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findOne(id: number): Promise<{ message: string } | any> {
    const contact = await this.contactRepository.findOne({ where: { id_contacto: id } });

    if (contact) {
      return contact;
    } else {
      return { message: 'Entidad no encontrada' };
    }
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact | null> {
    // Realiza la lógica para actualizar los datos del usuario
    const contact = await this.contactRepository.findOne({ where: { id_contacto: id } });

    if (!contact) {
      throw new NotFoundException(`El usuario con ID ${id} no fue encontrado.`);
    }
    console.log(updateContactDto);
    // Actualiza los campos que desees del usuario basado en los datos proporcionados en updateAuthDto
    if (updateContactDto.email) {
      contact.email = updateContactDto.email;
    }

    if (updateContactDto.nombre) {
      contact.nombre = updateContactDto.nombre;
    }

    if (updateContactDto.categoria) {
      contact.categoria = updateContactDto.categoria;
    }

    if (updateContactDto.telefono) {
      contact.telefono = updateContactDto.telefono;
    }
    if (updateContactDto.pais) {
      contact.pais = updateContactDto.pais;
    }
    if (updateContactDto.provincia) {
      contact.provincia = updateContactDto.provincia;
    }
    

    // Guarda los cambios en la base de datos
    await this.contactRepository.save(contact);
    // Devuelve el usuario actualizado
    return contact;
  }

  async remove(id: number): Promise<{ message: string }> {
    const deletedEntity = await this.contactRepository.delete(id);

    if (deletedEntity.affected === 1) {
      return { message: 'La entidad se eliminó correctamente' };
    } else {
      return { message: 'La entidad no se encontró o no se pudo eliminar' };
    }
  }
}
