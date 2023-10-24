import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ContactFontsLinesService } from './contact-fonts-lines.service';
import { CreateContactFontsLineDto } from './dto/create-contact-fonts-line.dto';
import { UpdateContactFontsLineDto } from './dto/update-contact-fonts-line.dto';

@Controller('contact-fonts-lines')
export class ContactFontsLinesController {
  constructor(private readonly contactFontsLinesService: ContactFontsLinesService) {}

  @Get('all') // ruta para listar todos los elementos
  async listAll() {
    console.log('Entrando al método listAll');

    const elements = await this.contactFontsLinesService.getAllElements();
  
    return elements;
    // Devuelve la lista completa de filas

  }

  @Post()
  create(@Body() createContactFontsLineDto: CreateContactFontsLineDto) {
    return this.contactFontsLinesService.create(createContactFontsLineDto);
  }

  @Get()
  findAll() {
    return this.contactFontsLinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactFontsLinesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactFontsLineDto: UpdateContactFontsLineDto) {
    return this.contactFontsLinesService.update(+id, updateContactFontsLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactFontsLinesService.remove(+id);
  }
}
