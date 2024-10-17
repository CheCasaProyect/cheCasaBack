import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ReservationDetail } from './reservationDetail.entity';

@Entity({
  name: `reservations`,
})
export class Reservation {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: `user_id` })
  user: User;

  @Column({
    type: 'date',
  })
  requestedAt: Date;

  @OneToOne(
    () => ReservationDetail,
    (reservationDetail) => reservationDetail.reservation,
  )
  @JoinColumn({ name: `reservation_detail_id` })
  reservationDetails: ReservationDetail;
}
