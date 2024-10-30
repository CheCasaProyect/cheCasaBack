import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { ReservationDetail } from './reservationDetail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: `reservations`,
})
export class Reservation {
  @PrimaryGeneratedColumn(`uuid`)
  @ApiProperty()
  id: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: `user_id` })
  @ApiProperty()
  user: User;

  @Column({
    type: 'date',
  })
  @ApiProperty()
  requestedAt: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalPrice: number;

  @Column({ default: true })
  @ApiProperty()
  active: boolean;

  @OneToOne(
    () => ReservationDetail,
    (reservationDetail) => reservationDetail.reservation,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: `reservation_detail_id` })
  @ApiProperty()
  reservationDetails: ReservationDetail;
}
