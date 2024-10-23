import { ApiProperty } from "@nestjs/swagger";
import { PropertyDto } from "./propertyDto";
import { ReservationDetailsDTO } from "./reservationDetailsDTO";
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";



export class ReservationsDTO{   

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    propertyId: PropertyDto;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    requestedAt: Date;

    @ApiProperty()
    @IsNotEmpty()
    checkIn: Date;

    @ApiProperty()
    @IsNotEmpty()
    checkOut: Date;

    @ApiProperty()
    reservationDetails: ReservationDetailsDTO;

    @ApiProperty({required: false})
    @IsOptional()
    totalPrice?: number;

}