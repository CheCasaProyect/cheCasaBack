import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateReservationDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  requestedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  checkIn: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  checkOut: Date;

  @ApiProperty()
  @IsNotEmpty()
  pax: number;

  @ApiProperty({ required: false })
  @IsOptional()
  totalPrice?: number;
}
