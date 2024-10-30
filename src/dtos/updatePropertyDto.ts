import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePropertyDto {
  @ApiProperty({
    description: 'Title, property type',
    example: 'Cabaña',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Property description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Property price',
    example: 1000,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Availability',
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  capacity?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  bedrooms?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  bathrooms?: number;
}
