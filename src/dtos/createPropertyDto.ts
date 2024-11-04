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
    description: 'Property title',
    example: 'Cabaña',
  })
  @IsString()
  ownerId: string;

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
    description: 'Property state',
  })
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
  price: number;

  @ApiProperty({
    description: 'Availability',
    default: true,
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

  @ApiProperty()
  @IsString()
  latitude?: string;

  @ApiProperty()
  @IsString()
  longitude?: string;
}
