import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/users.entity';
import { PropertyRepository } from 'src/property/property.repository';
import { ReservationsRepository } from 'src/reservations/reservations.repository';
import { Property } from 'src/entities/property.entity';
import { Reservation } from 'src/entities/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Property, Reservation, PropertyRepository, ReservationsRepository]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, PropertyRepository, ReservationsRepository],
})
export class UserModule {}
