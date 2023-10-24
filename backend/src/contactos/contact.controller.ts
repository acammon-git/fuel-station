<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactoDto } from './dto/update-contact.dto';
>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684

@Controller('contact')
export class ContactController {
  constructor(private readonly contactosService: ContactService) {}

  
<<<<<<< HEAD
  @Get('all') // ruta para listar todos los elementos
  async listAll() {
    console.log('Entrando al método listAll');
    
      const elements = await this.contactosService.getAllElements();
     
      return elements;
      // Devuelve la lista completa de filas
   
  }
  
=======
  @Get()
  getHello(): string {
    return 'Hello, World!';
  }
>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactosService.create(createContactDto);
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactosService.findOne(+id);
  }

<<<<<<< HEAD
  

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactoDto: UpdateContactDto) {
    return this.contactosService.update(+id, updateContactoDto);
  }
=======
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactoDto: UpdateContactoDto) {
    return this.contactosService.update(+id, updateContactoDto);
  }

>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactosService.remove(+id);
  }
}
