import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { port } from './common/util/envconfig';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add the global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strip properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if extra properties are sent
      transform: true, // Automatically transform payloads to match DTOs
    }),
  )
  await app.listen(port);
}
bootstrap();
