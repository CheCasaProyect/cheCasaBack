/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Property } from './property.entity';
import { Review } from './review.entity';

@Entity({
  name: `users`,
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar', //cambiar por enum!!
  })
  role: string; //cambiar por enum!!

  @Column({
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  password: string;

  @Column({
    type: 'integer',
  })
  nDni: number;

  @Column({
    type: 'varchar',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  city: string;

  @OneToMany(() => Reservation, (reservations) => reservations.user)
  reservations: Reservation[];

  @OneToMany(() => Property, (property) => property.owner)
  properties: Property[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
