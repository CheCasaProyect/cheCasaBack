import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";
import { v4 as uuid } from 'uuid';

export class PropertyDto {

    @ApiProperty({
        description: 'Title, property type',
        example: 'Cabaña'
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Property description'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Property location'
    })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({
        description: 'Property price',
        example: 1000
    })
    @IsNotEmpty()
    @IsInt()
    price: number;

    @ApiProperty({
        description: 'Availability'
    })
    @IsNotEmpty()
    @IsBoolean()
    isAvailable: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    capacity: number;

    @ApiProperty({
        type: 'file',
        format: '',
        description: 'Product image',
        example: 'product1.jpg'
    })
    @IsNotEmpty()
    @IsString()
    imgUrl: any;

}