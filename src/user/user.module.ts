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
import { ReservationDetail } from 'src/entities/reservationDetail.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from 'src/files/cloudinary.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User, Property, Reservation, ReservationDetail]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PropertyRepository,
    ReservationsRepository,
    CloudinaryService,
    CloudinaryConfig,
  ],
})
export class UserModule {}
