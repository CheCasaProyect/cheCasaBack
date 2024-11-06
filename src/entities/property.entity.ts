import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Review } from './review.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationDetail } from './reservationDetail.entity';

@Entity({
  name: `properties`,
})
export class Property {
  @PrimaryGeneratedColumn(`uuid`)
  @ApiProperty({
    description: 'Property id',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: `owner_id` })
  @ApiProperty()
  owner: User;

  @Column({ default: true })
  @ApiProperty()
  active: boolean;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @ApiProperty()
  title: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  @ApiProperty()
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  @ApiProperty()
  street: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  @ApiProperty()
  number: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @ApiProperty()
  postalCode: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @ApiProperty()
  state: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @ApiProperty()
  city: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  @ApiProperty()
  price: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  @ApiProperty()
  bedrooms: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  @ApiProperty()
  bathrooms: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  @ApiProperty()
  isAvailable: boolean;

  @Column({ type: 'int' })
  @ApiProperty()
  capacity: number;

  @Column({
    type: 'text',
    array: true,
  })
  @ApiProperty()
  photos: string[];

  @ApiProperty()
  @Column({ nullable: true })
  stripeProductId: string;

  @ApiProperty()
  @Column({ nullable: true })
  stripePriceId: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
    nullable: true,
  })
  latitude?: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    nullable: true,
  })
  longitude?: number;

  @OneToMany(() => Review, (review) => review.property, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  reviews: Review[];

  @OneToOne(
    () => ReservationDetail,
    (reservationDetail) => reservationDetail.property,
    { onDelete: 'CASCADE' },
  )
  @ApiProperty()
  reservationDetail: ReservationDetail;
}
