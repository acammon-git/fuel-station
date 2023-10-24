import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FontsLinesService } from './fonts-lines.service';
import { CreateFontsLineDto } from './dto/create-fonts-line.dto';
import { UpdateFontsLineDto } from './dto/update-fonts-line.dto';

@Controller('fonts-lines')
export class FontsLinesController {
  constructor(private readonly fontsLinesService: FontsLinesService) {}

  @Get('all') // ruta para listar todos los elementos
  async listAll() {
    console.log('Entrando al método listAll');

    const elements = await this.fontsLinesService.getAllElements();

    return elements;
    // Devuelve la lista completa de filas

  }

  @Post()
  create(@Body() createFontsLineDto: CreateFontsLineDto) {
    return this.fontsLinesService.create(createFontsLineDto);
  }

  @Get()
  findAll() {
    return this.fontsLinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fontsLinesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFontsLineDto: UpdateFontsLineDto) {
    return this.fontsLinesService.update(+id, updateFontsLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fontsLinesService.remove(+id);
  }
}
