import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const dotenv = require('dotenv');

async function bootstrap() {
  console.log("BOOTSTRAP TOP")

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  console.log("BOOTSTRAM MID")

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
