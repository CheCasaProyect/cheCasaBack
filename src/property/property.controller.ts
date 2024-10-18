import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';

@Controller(`properties`)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @Get()
  getProperties() {
    const properties = this.propertyService.getProperties();
    return properties;
  }
  @Get(`id`)
  getPropertyById(@Param(`id`) id: string) {
    const repository = this.propertyService.getPropertyById(id);
    return repository;
  }
  @Post()
  addProperty(@Body() property: CreatePropertyDto) {
    const newProperty = this.propertyService.addProperty(property);
    return newProperty;
  }
}
