import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Property } from './property.entity';
import { Review } from './review.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'User id',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: 'User firstname',
    example: 'CheCasa',
  })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: 'User lastname',
    example: 'CheCasa',
  })
  lastname: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  birthdate: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Phone number',
    example: '5491122334455',
  })
  phone: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  @ApiProperty({
    description: 'User email',
    example: 'checasa@test.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'User password',
    example: 'checasa123',
  })
  password: string;

  @Column({ default: true })
  @ApiProperty()
  active: boolean;

  @Column({
    type: 'text',
    default:
      'https://res.cloudinary.com/dddh5wrx3/image/upload/v1729712425/png-clipart-default-facebook-user-profile-blue-silhouette-neck-symbol-sky-folder-users-blue-silhouette_lfuate.png',
  })
  profileImgUrl: string;

  @ApiHideProperty()
  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  refreshToken?: string;

  @OneToMany(() => Reservation, (reservations) => reservations.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  reservations: Reservation[];

  @OneToMany(() => Property, (properties) => properties.owner, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  properties: Property[];

  @OneToMany(() => Review, (reviews) => reviews.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  reviews: Review[];
}
