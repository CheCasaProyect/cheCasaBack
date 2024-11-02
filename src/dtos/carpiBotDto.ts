import { IsDateString, IsString } from 'class-validator';

export class CarpiBotDto {
  @IsString()
  username?: string;

  @IsString()
  chat: string;

  @IsDateString()
  createdAt?: Date;

  @IsString()
  userId?: string;
}
