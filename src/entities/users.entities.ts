/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservations } from "./reservations.entities";



@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nDni: number;

    @Column()
    phone: number;

    @Column()
    address: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    role: string; //cambiar por enum!!

    @OneToMany(()=> Reservations, (reservations) => reservations.userId)
    @JoinColumn()
    reservations: Reservations[];
}