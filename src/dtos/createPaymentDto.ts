import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  stripeProductId: string;

  @ApiProperty()
  @IsNotEmpty()
  stripePriceId: string;
}
