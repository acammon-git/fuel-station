import { Module } from '@nestjs/common';
import { ContactFontsLinesService } from './contact-fonts-lines.service';
import { ContactFontsLinesController } from './contact-fonts-lines.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineasFuentesContactos } from './entities/lineas_fuentes_contactos.entity';

@Module({
  controllers: [ContactFontsLinesController],
  providers: [ContactFontsLinesService],
  imports: [
    // configuramos nuestras variables de entorno
    ConfigModule.forRoot(),
    // importamos nuestras entities para usarlas a nivel de modulo
    TypeOrmModule.forFeature([LineasFuentesContactos]),
  ]
})
export class ContactFontsLinesModule {}
