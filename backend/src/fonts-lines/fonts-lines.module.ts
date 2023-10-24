import { Module } from '@nestjs/common';
import { FontsLinesService } from './fonts-lines.service';
import { FontsLinesController } from './fonts-lines.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineasFuentes } from './entities/lineas_fuentes.entity';

@Module({
  controllers: [FontsLinesController],
  providers: [FontsLinesService], 
  imports: [
    // configuramos nuestras variables de entorno
    ConfigModule.forRoot(),
    // importamos nuestras entities para usarlas a nivel de modulo
    TypeOrmModule.forFeature([LineasFuentes]),
  ]
})
export class FontsLinesModule {}
