import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

@Module({
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
