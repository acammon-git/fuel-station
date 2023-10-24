import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
<<<<<<< HEAD
import { UsersGuard } from './guards/users.guard';

=======
import { AuthGuard } from 'src/auth/guards/auth.guard';
>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684


@Controller('users')
export class UsersController {
<<<<<<< HEAD
  
=======
  authService: any;
>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all') // ruta para listar todos los elementos
<<<<<<< HEAD
  @UseGuards(UsersGuard)
  async listAll(@Request() req) {
    console.log('Entrando al método listAll');
    if (req.user) {
    const elements = await this.usersService.getAllElements();
      console.log('Usuario no autenticado')
=======
  @UseGuards(AuthGuard)
  async listAll(@Request() req) {
    if (req.user) {
    const elements = await this.authService.getAllElements();
    
>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684
    return elements; 
    // Devuelve la lista completa de filas
    } else{
      console.log('Usuario no autenticado')
    }
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
<<<<<<< HEAD
    return this.usersService.update(+id, updateUserDto);
=======
    return this.authService.update(+id, updateUserDto);
>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
