import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReservationDTO } from 'src/dtos/createReservationDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccessGuard } from 'src/guards/role.guard';
import { ReviewsGuard } from 'src/guards/reviews.guard';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOperation({ summary: 'All Reservations' })
  @Get()
  getAllReservations() {
    return this.reservationsService.getAllReservation();
  }

  @ApiOperation({ summary: 'Create Reservation' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('newReservation')
  @HttpCode(HttpStatus.CREATED)
  createReservation(@Body() createReservation: CreateReservationDTO) {
    console.log('Payload de Reserva: ', createReservation);

    return this.reservationsService.createReservation(createReservation);
  }

  @ApiOperation({ summary: 'Cancel Reservation' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id/cancel')
  cancelReservation(@Param('id') id: string) {
    return this.cancelReservation(id);
  }

  @ApiOperation({ summary: 'User Reservation' })
  @UseGuards(AuthGuard /* AccessGuard */)
  @ApiBearerAuth()
  @Get(':id/user')
  getUserReservations(@Param('id') userId: string) {
    return this.reservationsService.getUserReservations(userId);
  }
}
