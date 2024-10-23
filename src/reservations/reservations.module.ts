import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from 'src/entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationsService, ReservationsRepository],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
