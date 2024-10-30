import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'Title, property type',
    example: 'Cabaña',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Property description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Property location',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Property price',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @ApiProperty({
    description: 'Availability',
  })
  @IsNotEmpty()
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  bedrooms: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  bathrooms: number;

  @ApiProperty()
  @IsNotEmpty()
  photos: string[];
}
