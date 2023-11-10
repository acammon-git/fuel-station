import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository, Entity } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { RegisterUserDto, CreateUserDto, UpdateAuthDto, LoginDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {
  async getAllElements() {
    try {
      // Utiliza el repositorio de TypeORM para realizar una consulta y obtener todos los elementos
      const elements = await this.userRepository.find();
      return elements;
    } catch (error) {
      // Manejo de errores, puedes personalizarlo según tus necesidades
      throw new Error('Error al obtener los elementos');
    }
  }
  

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async updateLastLogin(userId:number): Promise<void> {
    try {
    const user = await this.userRepository.findOne({ where: { id_usuario: userId } });
      if (user) {
        user.last_login = new Date();
        console.log('Fecha:', user.last_login)
        await this.userRepository.save(user);
      }else {
        // Manejar el caso en el que el usuario no se encuentra
        console.error(`No se encontró el usuario con ID ${userId}`);
      }
    } catch (error) {
      // Manejar el error durante el guardado
      console.error('Error al guardar el usuario:', error.message);
    }
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const {email, password, ...userData } = createUserDto;
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new BadRequestException(`El email ${email} ya existe.`);
      }
      const newUser = this.userRepository.create({
        email, password: bcryptjs.hashSync(password, 10),
        ...userData,
      });
      await this.userRepository.save(newUser);
      const { ...user } = newUser;
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
    
  }

  async register(registerDto: RegisterUserDto): Promise<LoginResponse> {
    const user = await this.create(registerDto);
    console.log({user})
    return {
      user,
      token: this.getJwtToken({ id: user.id_usuario }),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Not valid credentials - email');
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials - password');
    }
    const { ...rest } = user;
    console.log('Usuario: ',user)
    this.updateLastLogin(user.id_usuario);
    return {
      user: rest,
      token: this.getJwtToken({ id: user.id_usuario}),
    };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id): Promise<User | null> {
    const user = await this.userRepository.findOne(id);
    if (user.password) {
      const { ...rest } = user;
      return rest;
    } 
    return null;
  }
  
async update(id:number, updateAuthDto: UpdateAuthDto): Promise<User | null> {
  // Realiza la lógica para actualizar los datos del usuario
  const user = await this.userRepository.findOne({where: {id_usuario: id}});
  
  if (!user) {
    throw new NotFoundException(`El usuario con ID ${id} no fue encontrado.`);
  }
  console.log('datos usu: ',updateAuthDto);
  // Actualiza los campos que desees del usuario basado en los datos proporcionados en updateAuthDto
  if (updateAuthDto.email) {
    user.email = updateAuthDto.email;
  }
  
  if (updateAuthDto.nombre) {
    user.nombre = updateAuthDto.nombre;
  }

  if (updateAuthDto.password) {
    const hash=bcryptjs.hashSync(updateAuthDto.password, 10)
    user.password = hash;
  }

  if (updateAuthDto.pais) {
    user.pais = updateAuthDto.pais;
  }
  if (updateAuthDto.foto) {
    user.foto = updateAuthDto.foto;
  }
  if (updateAuthDto.activo) {
    user.activo = updateAuthDto.activo;
  }

  // Guarda los cambios en la base de datos
  await this.userRepository.save(user);
  // Devuelve el usuario actualizado
  return user;
}
//  Encuentra registro por id
async findOne(id: number): Promise<{ message: string }| any> {
  const user = await this.userRepository.findOne({where: {id_usuario: id}});

  if (user) {
    return user;
  } else {
    return { message: 'Entidad no encontrada' };
  }
}

  
//eliminar un registro y devolvemos una promesa con mensaje de información
  async remove(id: number): Promise<{ message: string }> {
    const deletedEntity = await this.userRepository.delete(id);

    if (deletedEntity.affected === 1) {
      return { message: 'La entidad se eliminó correctamente' };
    } else {
      return { message: 'La entidad no se encontró o no se pudo eliminar' };
    }
  }

  getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}