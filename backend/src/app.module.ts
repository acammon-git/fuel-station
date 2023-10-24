
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // Cambio de Mongoose a TypeORM
import { ConnectionOptions } from 'typeorm';

import { Lineas } from './lines/entities/lineas.entity'; // Importa las entidades necesarias
import { AuthModule } from './auth/auth.module';
import { LineasFuentes } from './fonts-lines/entities/lineas_fuentes.entity';
import { LineasFuentesContactos } from './contact-fonts-lines/entities/lineas_fuentes_contactos.entity';
import { LineasFuentesContactosLog } from './log-contact-fonts-lines/entities/lineas_fuentes_contactos_log.entity';
import { User } from './auth/entities/user.entity';
import { Contact } from './contactos/entities/contact.entity';
import { ContactModule } from './contactos/contact.module';
import { UsersModule } from './users/users.module';
import { LinesModule } from './lines/lines.module';
import { FontsLinesModule } from './fonts-lines/fonts-lines.module';
import { ContactFontsLinesModule } from './contact-fonts-lines/contact-fonts-lines.module';
import { LogContactFontsLinesModule } from './log-contact-fonts-lines/log-contact-fonts-lines.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    // datos de conexión a la base de datos
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [Lineas,LineasFuentes, LineasFuentesContactos, LineasFuentesContactosLog,User,Contact], // Agrega aquí todas las entidades que quieras utilizar
        synchronize: false, // Cambia a false en producción
      }),
    }),
    
    // TODO: Habilitar los siguientes módulos
    AuthModule,
    ContactModule,
    UsersModule,
    LinesModule,
    FontsLinesModule,
    ContactFontsLinesModule,
    LogContactFontsLinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}