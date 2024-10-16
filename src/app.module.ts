/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm'; 
import { DataSource } from 'typeorm';


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
    AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})


export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {} 

  async onModuleInit() {
    console.log('App iniciada correctamente');
    }
  }
