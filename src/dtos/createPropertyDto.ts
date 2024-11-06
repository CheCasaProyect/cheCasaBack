import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Property description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Property state',
  })
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Property city',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Property price',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'Availability',
    default: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  isAvailable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  bedrooms: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  bathrooms: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  latitude?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  longitude?: number;
}
