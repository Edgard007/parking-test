import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api"); // ==> Config Global prefix

  await app.listen(process.env.PORT);
  console.info(`App running on port ${process.env.PORT}`);
}
bootstrap();
