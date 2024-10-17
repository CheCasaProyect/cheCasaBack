/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservations } from "./reservations.entity";



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


// import { ApiProperty } from "@nestjs/swagger";
// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { v4 as uuid } from 'uuid'
// import { UserRole } from "../utils/user.enum";

// @Entity ({
//     name: 'users',
// })
// export class User {
//     @PrimaryGeneratedColumn()
//     @ApiProperty({
//         description: 'User id',
//         format: 'uuid',
//         example: '550e8400-e29b-41d4-a716-446655440000'
//        })
//        id: string = uuid();

//     @Column({type: 'varchar', length: 50, nullable: false})
//     @ApiProperty({
//         description: 'User firstname',
//         example: 'CheCasa'
//     }) 
//     firstname: string;

//     @Column({type: 'varchar', length: 50, nullable: false})
//     @ApiProperty({
//         description: 'User lastname',
//         example: 'CheCasa'
//     }) 
//     lastname: string;

//     @Column({})
//     @ApiProperty({})
//     birthdate: Date

//     @Column({type: 'int'})
//     @ApiProperty({
//         description: 'Phone number',
//         example: '5491122334455'
//     })
//     phone: number;

//     @Column({type: 'varchar', length: 50, unique: true, nullable: false})
//     @ApiProperty({
//         description: 'User email',
//         example: 'checasa@test.com'
//     })
//     email: string;

//     @Column({type: 'varchar', length:128, nullable: false})
//     @ApiProperty({
//         description: 'User password',
//         example: 'checasa123'
//     })
//     password: string;

//     @Column({type: 'enum', enum: UserRole})
//     @ApiProperty({
//         description: ' User role',
//         enum: UserRole,
//         example: 'Traveler'
//     })
//     role: UserRole

//     @OneToMany(()=> Reservations, (reservations) => reservations.userId)
//     @JoinColumn()
//     reservations: Reservations[];


// }