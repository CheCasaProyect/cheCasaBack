import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ReservationsModule,
    PropertyModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
