import { Module } from '@nestjs/common';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lineas } from './entities/lineas.entity';


@Module({
  controllers: [LinesController],
  providers: [LinesService],
  imports: [
    // configuramos nuestras variables de entorno
    ConfigModule.forRoot(),
    // importamos nuestras entities para usarlas a nivel de modulo
    TypeOrmModule.forFeature([Lineas]),
  ]
})
export class LinesModule {}
