import { Module } from '@nestjs/common';
import { LogContactFontsLinesService } from './log-contact-fonts-lines.service';
import { LogContactFontsLinesController } from './log-contact-fonts-lines.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineasFuentesContactosLog } from './entities/lineas_fuentes_contactos_log.entity';

@Module({
  controllers: [LogContactFontsLinesController],
  providers: [LogContactFontsLinesService],
  imports: [
    // configuramos nuestras variables de entorno
    ConfigModule.forRoot(),
    // importamos nuestras entities para usarlas a nivel de modulo
    TypeOrmModule.forFeature([LineasFuentesContactosLog]),
  ]
})
export class LogContactFontsLinesModule {}
