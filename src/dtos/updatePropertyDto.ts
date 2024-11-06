import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Property description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  street!: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  number!: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  postalCode!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  state!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city!: string;

  @ApiProperty({
    description: 'Property price',
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @ApiProperty({
    description: 'Availability',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isAvailable?: boolean;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  capacity?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  bedrooms?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  bathrooms?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  photos: string[];
}
