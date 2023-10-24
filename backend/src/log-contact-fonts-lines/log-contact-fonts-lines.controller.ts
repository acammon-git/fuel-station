import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LogContactFontsLinesService } from './log-contact-fonts-lines.service';
import { CreateLogContactFontsLineDto } from './dto/create-log-contact-fonts-line.dto';
import { UpdateLogContactFontsLineDto } from './dto/update-log-contact-fonts-line.dto';

@Controller('log-contact-fonts-lines')
export class LogContactFontsLinesController {
  constructor(private readonly logContactFontsLinesService: LogContactFontsLinesService) {}

  @Get('all') // ruta para listar todos los elementos
  async listAll() {
    console.log('Entrando al método listAll');

    const elements = await this.logContactFontsLinesService.getAllElements();

    return elements;
    // Devuelve la lista completa de filas

  }

  @Post()
  create(@Body() createLogContactFontsLineDto: CreateLogContactFontsLineDto) {
    return this.logContactFontsLinesService.create(createLogContactFontsLineDto);
  }

  @Get()
  findAll() {
    return this.logContactFontsLinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logContactFontsLinesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLogContactFontsLineDto: UpdateLogContactFontsLineDto) {
    return this.logContactFontsLinesService.update(+id, updateLogContactFontsLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logContactFontsLinesService.remove(+id);
  }
}
