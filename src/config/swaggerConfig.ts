// import { ValidationPipe } from "@nestjs/common";
// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "src/app.module";

// async function bootstrap() {
//     const app = await NestFactory.create(AppModule);
//     app.use(auth(auth0Config))
//     app.enableCors();
//     app.useGlobalPipes(new ValidationPipe ({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true
//     }));
//     swaggerConfig(app);
  
//     await app.listen(3000);
  
  
//   }
//   bootstrap();