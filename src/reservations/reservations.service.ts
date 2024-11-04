import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';

import { CreateReservationDTO } from 'src/dtos/createReservationDto';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}

  createReservation(createReservation: CreateReservationDTO) {
    const newReservation =
      this.reservationRepository.createReservation(createReservation);
    return newReservation;
  }

  getAllReservation() {
    return this.reservationRepository.getAllReservation();
  }

  getUserReservations(userId: string) {
    return this.reservationRepository.getReservationByUserId(userId);
  }
}
