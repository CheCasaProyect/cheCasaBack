import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'



@Entity({
    name: 'properties'
})
export class Property{
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Property id',
        format: 'uuid',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    id: string= uuid()

    @Column({type: 'varchar'})
    @ApiProperty()
    title: string;

    @Column({ type: 'text'})
    @ApiProperty()
    description: string;

    @Column({type: 'varchar'})
    @ApiProperty()
    location: string;

    @Column({type: 'decimal'})
    @ApiProperty()
    price: number;

    @Column({ default: true })
    @ApiProperty()
    isAvailable: boolean;

    @Column({type: 'int'})
    @ApiProperty()
    capacity: number;

    
    @Column({type: 'varchar'})
    @ApiProperty({
    description: 'Product image',
    example: 'product1.jpg'
  })
    imgUrl: string;
    

}

