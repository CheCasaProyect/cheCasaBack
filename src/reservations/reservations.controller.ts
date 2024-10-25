import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReservationDTO } from 'src/dtos/createReservationDto';


@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}


  @ApiOperation({ summary: 'Create Reservation' })
  @Post('newReservation')
  @HttpCode(HttpStatus.CREATED)
  createReservation(
    @Body() createReservation: CreateReservationDTO) {
    return this.reservationsService.createReservation(
        createReservation.reservation,
        createReservation.reservationDetails
    );
  }
}
