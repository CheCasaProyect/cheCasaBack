import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from 'src/entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { User } from 'src/entities/users.entity';
import { ReservationDetail } from 'src/entities/reservationDetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Property, User, ReservationDetail]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
  exports: [ReservationsRepository],
})
export class ReservationsModule {}
