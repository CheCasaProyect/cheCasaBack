import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsDTO } from 'src/dtos/reservationDto';
import { ReservationDetailsDTO } from 'src/dtos/reservationDetailsDTO';

@Injectable()
export class ReservationsService {
    constructor(private readonly reservationRepository: ReservationsRepository){}

    createReservation(reservation: ReservationsDTO, reservationDetails: ReservationDetailsDTO) {
        const newReservation = this.reservationRepository.createReservation(reservation, reservationDetails);
        return newReservation
    }
}
