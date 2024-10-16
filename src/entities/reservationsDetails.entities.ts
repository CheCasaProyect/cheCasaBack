import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entities";



@Entity()
export class ReservationDetails{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    reservationDate: Date;

    @Column()
    reservationEnd: Date;

    @Column() 
    pax: number;

    @OneToOne(() => Properties, (property) => property)
    property: Properties;
}