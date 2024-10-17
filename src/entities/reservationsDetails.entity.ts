import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./properties.entity";
import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



@Entity()
export class ReservationDetails{
    @PrimaryGeneratedColumn()
    @IsUUID()
    id: string;

    @Column()
    @ApiProperty()
    reservationDate: Date;

    @Column()
    @ApiProperty()
    reservationEnd: Date;

    @Column() 
    @ApiProperty()
    pax: number;

    @OneToOne(() => Property, (property) => property)
    property: Property;
}