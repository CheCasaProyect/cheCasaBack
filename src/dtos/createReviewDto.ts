import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: `string` })
  propertyId: string;

  @IsNotEmpty()
  @ApiProperty({ example: `string` })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: `Reservé acá, me pareció muy buen lugar y cómodo` })
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: `3` })
  rating: number;
}
