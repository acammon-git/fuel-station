import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [
    // configuramos nuestras variables de entorno
    ConfigModule.forRoot(),
    // importamos nuestras entities para usarlas a nivel de modulo
    TypeOrmModule.forFeature([Contact]),
  ]
=======

@Module({
  controllers: [ContactController],
  providers: [ContactService]
>>>>>>> b23cfb1fcc8557933025dd64f8f12c0023da4684
})
export class ContactModule {}
