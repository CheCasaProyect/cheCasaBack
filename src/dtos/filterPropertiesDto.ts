import { IsOptional, IsArray, IsNumber, IsString } from 'class-validator';

export class FilterPropertiesDto {
  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  price?: number[];

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  bedrooms?: number[];
}
