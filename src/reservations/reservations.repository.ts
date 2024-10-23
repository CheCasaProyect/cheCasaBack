import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Property } from 'src/entities/property.entity';
  import { LessThanOrEqual, Repository } from 'typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { ReservationsDTO } from 'src/dtos/reservationDto';
import {ReservationDetailsDTO} from 'src/dtos/reservationDetailsDTO';
import { User } from 'src/entities/users.entity';
import { ReservationDetail } from 'src/entities/reservationDetail.entity';
  
  @Injectable()
  export class ReservationsRepository{
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(ReservationDetail)
        private readonly reservationDetailsRepository: Repository<ReservationDetail>) {}

        async createReservation(reservation: ReservationsDTO, reservationDetails: ReservationDetailsDTO): Promise<Reservation>{

            const property = await this.propertyRepository.findOne({
              where: { id: reservationDetails.propertyId, isAvailable: true},
            });
            if (!property) {
              throw new NotFoundException('La propiedad no existe o no está disponible');
            }

            const user = await this.userRepository.findOne({
              where: {id: reservation.userId} 
            });

            if (!user) {
              throw new NotFoundException('usuario inexistente');
            }

            const newReservationDetails = this.reservationDetailsRepository.create({
              checkIn: reservationDetails.checkIn,
              checkOut: reservationDetails.checkOut,
              pax: reservationDetails.pax,
              property: property,
            });

            await this.reservationDetailsRepository.save(newReservationDetails);

            const duration = (new Date(reservationDetails.checkOut).getTime() - new Date(reservationDetails.checkIn).getTime()) /(1000*3600*24);
            const totalPrice = duration * property.price;

            const newReservation = this.reservationRepository.create({
              user: user,
              requestedAt: new Date(),
              reservationDetails: newReservationDetails,
            })

            await this.reservationRepository.save(newReservation);
            return newReservation
        }
  }