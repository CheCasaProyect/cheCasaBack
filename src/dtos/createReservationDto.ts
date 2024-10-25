import { ApiProperty } from '@nestjs/swagger';
import { ReservationsDTO } from './reservationDto';
import { ReservationDetailsDTO } from './reservationDetailsDTO';


export class CreateReservationDTO {
  @ApiProperty()
  reservation: ReservationsDTO;

  @ApiProperty()
  reservationDetails: ReservationDetailsDTO;
}
