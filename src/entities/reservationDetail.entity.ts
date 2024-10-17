import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { Reservation } from './reservation.entity';

@Entity({
  name: `reservations_details`,
})
export class ReservationDetail {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @OneToOne(() => Reservation, (reservation) => reservation.reservationDetails)
  @JoinColumn({ name: `reservation_id` })
  reservation: Reservation;

  @Column({
    type: 'date',
  })
  reservationDate: Date;

  @Column({
    type: 'date',
  })
  reservationEnd: Date;

  @Column({
    type: 'integer',
  })
  pax: number;

  @OneToOne(() => Property)
  @JoinColumn({ name: `property_id` })
  property: Property;
}
