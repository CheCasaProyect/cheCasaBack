import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entities";



@Entity()
export class Reservations{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userId: User;

    @Column()
    requestedAt: Date;
    
}