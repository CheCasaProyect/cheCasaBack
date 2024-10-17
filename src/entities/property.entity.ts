import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity({
  name: `properties`,
})
export class Property {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: `owner_id` })
  owner: User;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'integer',
  })
  maxPeople: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  location: string;

  @Column({
    type: 'varchar', //este tipo no es el final,
  })
  images: string; //este tipo no es el final.

  @Column({
    type: 'boolean',
  })
  available: boolean; //aquí el tipo boolean es para tener una referencia.

  @OneToMany(() => Review, (review) => review.property)
  reviews: Review[];
}
