import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { User } from './entities/user.entity';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'Hello, World!';
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login( @Body() loginDto: LoginDto  ) {
    return this.authService.login( loginDto );
  }

  @Post('/register')
  register( @Body() registerDto: RegisterUserDto  ) {
    return this.authService.register( registerDto );
  }
  
  

  // LoginResponse
 
  @Get('check-token')
  @UseGuards(AuthGuard)
  checkToken( @Request() req): any {
      
    try {
      const authorizationHeader = req.headers['authorization']; 

      if (authorizationHeader) {
        return authorizationHeader;
        // const token = authorizationHeader.split(' ')[1];

        //  return {
        //   user,
        //   token: this.authService.getJwtToken({ id: user.id_usuario })
        // }
      } else {
        return 'No se encontró el encabezado de autorización';
      }
  
     
    } catch (error) {
      console.log(error);
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
