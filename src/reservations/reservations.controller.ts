import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
  createReservation(@Body() createReservation: CreateReservationDTO) {
    console.log('Payload de Reserva: ', createReservation);

    return this.reservationsService.createReservation(createReservation);
  }

  @ApiOperation({ summary: 'Cancel Reservation' })
  @Put(':id/cancel')
  cancelReservation(@Param('id') id: string) {
    return this.cancelReservation(id);
  }
}
