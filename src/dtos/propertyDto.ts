import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PropertyDto {
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
  @IsInt()
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

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Property image'
  })
  @IsNotEmpty()
  @IsString()
  photos: Express.Multer.File[];;
}
