import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}
  getProperties() {
    const properties = this.propertyRepository.getProperties();
    return properties;
  }
  getPropertyById(id: string) {
    const property = this.propertyRepository.getPropertyById(id);
    return property;
  }
  addProperty(property: CreatePropertyDto) {
    const newProperty = this.propertyRepository.addProperty(property);
    return newProperty;
  }

  filterProperties(filters: any) {
    return this.propertyRepository.filterProperties(filters);
  }
}
