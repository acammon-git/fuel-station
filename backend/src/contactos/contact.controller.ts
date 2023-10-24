import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactosService: ContactService) {}

  
  @Get('all') // ruta para listar todos los elementos
  async listAll() {
    console.log('Entrando al método listAll');
    
      const elements = await this.contactosService.getAllElements();
     
      return elements;
      // Devuelve la lista completa de filas
   
  }
  
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactosService.create(createContactDto);
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactosService.findOne(+id);
  }

  

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactoDto: UpdateContactDto) {
    return this.contactosService.update(+id, updateContactoDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactosService.remove(+id);
  }
}
