import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { User } from 'src/entities/users.entity';
import { ReservationDetail } from 'src/entities/reservationDetail.entity';
import { CreateReservationDTO } from 'src/dtos/createReservationDto';
import { transporter } from 'src/config/mailer';

@Injectable()
export class ReservationsRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ReservationDetail)
    private readonly reservationDetailsRepository: Repository<ReservationDetail>,
  ) {}

  async createReservation(
    createReservation: CreateReservationDTO,
  ): Promise<Reservation> {
    console.log('Payload de reserva: ', createReservation);

    if (!createReservation) {
      throw new BadRequestException(
        'El objeto reservation o userId es inválido',
      );
    }

    const property = await this.propertyRepository.findOne({
      where: { id: createReservation.propertyId, isAvailable: true },
    });
    if (!property) {
      throw new NotFoundException(
        'La propiedad no existe o no está disponible',
      );
    }
    console.log(property);

    const user = await this.userRepository.findOne({
      where: { id: createReservation.userId },
    });
    if (!user) {
      throw new NotFoundException('usuario inexistente');
    }

    console.log(user);

    const newReservationDetails = this.reservationDetailsRepository.create({
      checkIn: createReservation.checkIn,
      checkOut: createReservation.checkOut,
      pax: createReservation.pax,
      property: property,
    });

    await this.reservationDetailsRepository.save(newReservationDetails);

    const duration =
      (new Date(createReservation.checkOut).getTime() -
        new Date(createReservation.checkIn).getTime()) /
      (1000 * 3600 * 24);
    const totalPrice = duration * property.price;

    const newReservation = this.reservationRepository.create({
      user: user,
      requestedAt: new Date(),
      reservationDetails: newReservationDetails,
      totalPrice: totalPrice,
    });

    await this.reservationRepository.save(newReservation);
    await transporter.sendMail({
      from: '"Tu reserva en CheCasa fue exitosa" <che.casa.proyect@gmail.com>',
      to: user.email,
      subject: 'Reserva exitosa',
      html: `<b>Los datos de tu reserva son: ${newReservation}</b>`, //Mensaje de prueba.
    });
    return newReservation;
  }
}
