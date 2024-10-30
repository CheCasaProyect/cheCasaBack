import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';

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
  addProperty(property: CreatePropertyDto, files: Express.Multer.File[]) {
    const newProperty = this.propertyRepository.addProperty(property, files);
    return newProperty;
  }
  updateProperty(id: string, property: UpdatePropertyDto) {
    const updateProperty = this.propertyRepository.updateProperty(id, property);
    return updateProperty;
  }
  deactivateProperty(id: string) {
    const deactivatedProperty = this.propertyRepository.deactivateProperty(id);
    return deactivatedProperty;
  }
  activateProperty(id: string) {
    const activatedProperty = this.propertyRepository.activateProperty(id);
    return activatedProperty;
  }
  filterProperties(filters: any) {
    return this.propertyRepository.filterProperties(filters);
  }
}
