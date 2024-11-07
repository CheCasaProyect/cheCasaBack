import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PropertyModule,
    ReservationsModule,
    PassportModule.register({
      defaultStrategy: 'google',
      session: false,
    }),
  ],
  providers: [GoogleService, UserRepository],
  controllers: [GoogleController],
})
export class GoogleModule {}
