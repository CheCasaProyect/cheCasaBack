import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swaggerConfig';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  setupSwagger(app);

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept',
  //   );
  //   res.header(
  //     'Access-Control-Allow-Methods',
  //     'GET, POST, OPTIONS, PUT, DELETE',
  //   );
  //   next();
  // });

  await app.listen(3000);
}

bootstrap();
