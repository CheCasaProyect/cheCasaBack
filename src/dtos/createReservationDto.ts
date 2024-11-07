import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateReservationDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkIn: Date;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkOut: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  pax: number;
}
