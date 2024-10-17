import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Property } from './property.entity';

@Entity({
  name: `reviews`,
})
export class Review {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: `user_id` })
  user: User;

  @ManyToOne(() => Property, (property) => property.reviews)
  @JoinColumn({ name: `property_id` })
  property: Property;

  @Column({
    type: 'date',
  })
  requestedAt: Date;

  @Column({
    type: 'varchar',
    length: 350,
  })
  comment: string;

  @Column({
    type: 'integer',
  })
  rating: number;
}
