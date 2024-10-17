import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";



@Entity()
export class Reservations{
    @PrimaryGeneratedColumn()
    @IsUUID()
    id: string;

    @Column()
    @ApiProperty()
    userId: User;

    @Column()
    @ApiProperty()
    requestedAt: Date;
    
}