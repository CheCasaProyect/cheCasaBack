import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Property } from './property.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: `reviews`,
})
export class Review {
  @PrimaryGeneratedColumn(`uuid`)
  @ApiProperty()
  id: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: `user_id` })
  @ApiProperty()
  user: User;

  @ManyToOne(() => Property, (property) => property.reviews)
  @JoinColumn({ name: `property_id` })
  @ApiProperty()
  property: Property;

  @Column({
    type: 'date',
  })
  @ApiProperty()
  reviewDate: Date;

  @Column({
    type: 'varchar',
    length: 350,
  })
  @ApiProperty()
  comment: string;

  @Column({
    type: 'integer',
  })
  @ApiProperty()
  rating: number;
}
