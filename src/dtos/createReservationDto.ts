import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @Type(() => Date)
  requestedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkIn: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkOut: Date;

  @ApiProperty()
  @IsNotEmpty()
  pax: number;

  @ApiProperty({ required: false })
  @IsOptional()
  totalPrice?: number;
}
