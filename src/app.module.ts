/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import typeOrmConfig from './config/typeorm'; 
import typeOrmConfig from './config/typeorm';

import { DataSource } from 'typeorm';
import { FileUploadModule } from './cloudinary/file-upload.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig]
  }),
  TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(configService: ConfigService) => configService.get('typeorm'),
  }),
    AuthModule,
    UserModule,
    FileUploadModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    console.log('App iniciada correctamente');
  }
}
