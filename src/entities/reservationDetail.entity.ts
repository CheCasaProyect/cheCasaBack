import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { Reservation } from './reservation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: `reservations_details`,
})
export class ReservationDetail {
  @PrimaryGeneratedColumn(`uuid`)
  @ApiProperty()
  id: string;

  @OneToOne(
    () => Reservation,
    (reservation) => reservation.reservationDetails,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: `reservation_id` })
  @ApiProperty()
  reservation: Reservation; //Se relaciona con la reserva hecha.

  @Column({
    type: 'date',
  })
  @ApiProperty()
  checkIn: Date;

  @Column({
    type: 'date',
  })
  @ApiProperty()
  checkOut: Date;

  @Column({
    type: 'integer',
  })
  @ApiProperty()
  pax: number;

  @OneToOne(() => Property, (property) => property.reservationDetail, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: `property_id` })
  @ApiProperty()
  property: Property;
}
