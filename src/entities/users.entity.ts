import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reservation } from './reservation.entity';
import { Property } from './property.entity';
import { Review } from './review.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryColumn('varchar')
  @ApiProperty({
    description: 'User id',
    format: 'varchar(255)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

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

  @Column({ type: 'int', nullable: true })
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

  @OneToMany(() => Reservation, (reservations) => reservations.user)
  @JoinColumn()
  reservations: Reservation[];

  @OneToMany(() => Property, (properties) => properties.owner)
  @JoinColumn()
  properties: Property[];

  @OneToMany(() => Review, (reviews) => reviews.user)
  @JoinColumn()
  reviews: Review[];

  @Column({
    type: 'text',
    default:
      'https://res.cloudinary.com/dddh5wrx3/image/upload/v1729712425/png-clipart-default-facebook-user-profile-blue-silhouette-neck-symbol-sky-folder-users-blue-silhouette_lfuate.png',
  })
  profileImgUrl: string;
}
