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
  owner: User; //Se relaciona el dueño de la propiedad.

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
    type: 'integer',
    nullable: true,
  })
  @ApiProperty()
  bedrooms: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  @ApiProperty()
  bathrooms: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  @ApiProperty()
  isAvailable: boolean; //aquí el tipo boolean es para tener una referencia, pero se podría poner otra cosa para ver para qué fecha vuelve a estar disponible.

  @Column({ type: 'integer' })
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
  @Column({ nullable: true })
  latitude?: string;

  @ApiProperty()
  @Column({ nullable: true })
  longitude?: string;

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
