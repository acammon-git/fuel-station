// src/main.ts
import { NestFactory }    from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule }      from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Accept','Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:           true,
      forbidNonWhitelisted:true,
    }),
  );

  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
}

bootstrap();
