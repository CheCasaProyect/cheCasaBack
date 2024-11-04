import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { EntityRepository, LessThanOrEqual, Repository } from 'typeorm';
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
      html: `
      <b>Los datos de tu reserva son:</b>
      <ul>
      <li><p>Nombre del reservante: ${newReservation.user.firstname}</p></li>
      <li><p>Apellido del reservante: ${newReservation.user.lastname}</p></li>
      <li><p>Fecha de la operación: ${newReservation.requestedAt}</p></li>
      <li><p>Propiedad: ${newReservation.reservationDetails.property.title}</p></li>
      <li><p>Ubicación de la propiedad: ${newReservation.reservationDetails.property.state}</p></li>
        <li><p>Fecha de inicio de la reserva: ${newReservation.reservationDetails.checkIn}</p></li>
        <li><p>Fecha de finalización de la reserva: ${newReservation.reservationDetails.checkOut}</p></li>
        <li><p>Nro. de huéspedes reservados: ${newReservation.reservationDetails.pax}</p></li>
        <li><p>Total de precio pagado: ${newReservation.totalPrice}</p></li>
      </ul>
      `,
    });
    return newReservation;
  }

  async cancelReservation(id: string) {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (!reservation) throw new NotFoundException('Reservation not found');

    reservation.active = false;
    const user = await this.userRepository.findOne({
      where: { id: reservation.user.id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await transporter.sendMail({
      from: '"Tu reserva en CheCasa fue cancelada eitosamente 😔" <che.casa.proyect@gmail.com>',
      to: user.email,
      subject: 'Reserva cancelada con éxito',
      html: `
      <b>Los datos de tu reserva cancelada son:</b>
      <ul>
      <li><p>Nombre del reservante: ${reservation.user.firstname}</p></li>
      <li><p>Apellido del reservante: ${reservation.user.lastname}</p></li>
      <li><p>Fecha de la operación de la reserva: ${reservation.requestedAt}</p></li>
      <li><p>Propiedad: ${reservation.reservationDetails.property.title}</p></li>
      <li><p>Ubicación de la propiedad: ${reservation.reservationDetails.property.state}</p></li>
        <li><p>Fecha de inicio de la reserva: ${reservation.reservationDetails.checkIn}</p></li>
        <li><p>Fecha de finalización de la reserva: ${reservation.reservationDetails.checkOut}</p></li>
        <li><p>Nro. de huéspedes reservados: ${reservation.reservationDetails.pax}</p></li>
        <li><p>Total de dinero a devolver: ${reservation.totalPrice}</p></li>
      </ul>
      `,
    });
    await this.reservationRepository.save(reservation);
  }

  async getAllReservation() {
    return await this.reservationRepository.find();
  }

  async getReservationByUserId(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['reservations'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.reservations && user.reservations.length > 0
      ? user.reservations
      : [];
  }
}
