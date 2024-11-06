import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  propertyId: string;
  
  @ApiProperty()
  @IsNotEmpty()
  checkIn: string;  
  
  @ApiProperty()
  @IsNotEmpty()
  checkOut: string;    
}
