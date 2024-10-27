import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';
import { Property } from 'src/entities/property.entity';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';

@ApiTags(`property`)
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
  @Put(`:id`)
  updateProperty(@Param(`id`) id: string, @Body() property: UpdatePropertyDto) {
    const updateProperty = this.propertyService.updateProperty(id, property);
    return updateProperty;
  }
  @Put(`/deactivate/:id`)
  deacticateProperty(@Param(`id`) id: string) {
    const deactivatedProperty = this.propertyService.deactivateProperty(id);
    return deactivatedProperty;
  }
  @Put(`/activate/:id`)
  activateProperty(@Param(`id`) id: string) {
    const activatedProperty = this.propertyService.activateProperty(id);
    return activatedProperty;
  }
  @Get('filter')
  async filterProperties(@Query() query: any): Promise<Property[]> {
    return this.propertyService.filterProperties(query);
  }
}
