import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'carpiBot',
})
export class CarpiBot {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  @ApiProperty({
    description: 'Username',
  })
  username: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'Message',
  })
  chat: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  @ApiProperty()
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({
    description: 'Created at',
  })
  createdAt?: Date;
}
