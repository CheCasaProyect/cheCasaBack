/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Property } from './property.entity';
import { Review } from './review.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: `users`,
})
export class User {
  @PrimaryGeneratedColumn(`uuid`)
  @ApiProperty()
  id: number;

  @Column({
    type: 'varchar', //cambiar por enum!!
  })
  @ApiProperty()
  role: string; //cambiar por enum!!

  @Column({
    type: 'varchar',
    length: 30,
  })
  @ApiProperty()
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  @ApiProperty()
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  @ApiProperty()
  password: string;

  @Column({
    type: 'integer',
  })
  @ApiProperty()
  nDni: number;

  @Column({
    type: 'varchar',
  })
  @ApiProperty()
  phone: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  @ApiProperty()
  address: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  @ApiProperty()
  country: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  @ApiProperty()
  city: string;

  @OneToMany(() => Reservation, (reservations) => reservations.user)
  @ApiProperty()
  reservations: Reservation[];

  @OneToMany(() => Property, (property) => property.owner)
  @ApiProperty()
  properties: Property[];

  @OneToMany(() => Review, (review) => review.user)
  @ApiProperty()
  reviews: Review[];
}
