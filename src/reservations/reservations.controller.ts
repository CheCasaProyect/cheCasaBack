import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsDTO } from 'src/dtos/reservationDto';
import { ReservationDetailsDTO } from 'src/dtos/reservationDetailsDTO';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createReservation(
    @Body() reservationDto: ReservationsDTO,
    @Body() reservationDetails: ReservationDetailsDTO,
  ) {
    return this.reservationsService.createReservation(
      reservationDto,
      reservationDetails,
    );
  }
}
