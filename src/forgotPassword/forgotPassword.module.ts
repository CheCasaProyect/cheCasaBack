import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { ForgotPasswordService } from './forgotPassword.service';
import { ForgotPasswordRepository } from './forgotPassword.repository';
import { ForgotPasswordController } from './forgotPassword.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ForgotPasswordService, ForgotPasswordRepository],
  controllers: [ForgotPasswordController],
})
export class ForgotPasswordModule {}
