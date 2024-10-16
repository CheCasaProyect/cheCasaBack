/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm'; 


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
export class AppModule {}
