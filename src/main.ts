import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // disableErrorMessages: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() =>
    console.log(` 🚀 Server started on port ${process.env.PORT ?? 3000}!`),
  )
  .catch(console.error);
