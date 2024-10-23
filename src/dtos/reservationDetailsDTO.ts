import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from "class-validator";


export class ReservationDetailsDTO{


    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    checkIn: Date;

    @ApiProperty()
    @IsNotEmpty()
    checkOut: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(1)
    pax: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    propertyId: string;
}