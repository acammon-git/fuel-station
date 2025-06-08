// src/app.module.ts
import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule }        from '@nestjs/config';
import { TypeOrmModule }       from '@nestjs/typeorm';
import { AuthModule }          from './auth/auth.module';
import { UsersModule }         from './users/users.module';
import { ServeImagesModule }   from './serve-images/serve-images.module';
import { FuelStationModule }   from './fuel-stations/fuel-station.module';
import { FavoritesModule }     from './favorites/favorites.module';

import { User }         from './auth/entities/user.entity';
import { FuelStation }  from './fuel-stations/entities/fuel-stations.entity';
import { Favorite }     from './favorites/entities/favorite.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type:       'mysql',
        host:       process.env.MYSQL_HOST,
        port:       +process.env.MYSQL_PORT,
        username:   process.env.MYSQL_USER,
        password:   process.env.MYSQL_PASSWORD,
        database:   process.env.MYSQL_DATABASE,
        entities:   [User, FuelStation, Favorite],
        synchronize:false,              // ← esto debe ejecutarse
        //autoLoadEntities: true,        // ← opcional, si usas forFeature
        //dropSchema: true, 
      }),
    }),
    TypeOrmModule.forFeature([User, FuelStation, Favorite]),

    AuthModule,
    UsersModule,
    ServeImagesModule,
    FuelStationModule,
    FavoritesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
        next();
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
