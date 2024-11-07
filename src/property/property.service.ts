import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';
import { User } from 'src/entities/users.entity';

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

  async addProperty(
    property: CreatePropertyDto,
    photos: Express.Multer.File[],
    /* owner: User, */
  ) {
    const newProperty = await this.propertyRepository.addProperty(
      property,
      photos,
      /* owner, */
    );
    return newProperty;
  }

  async updateProperty(
    id: string,
    property: UpdatePropertyDto,
    photos: Express.Multer.File[],
  ) {
    const updateProperty = await this.propertyRepository.updateProperty(
      id,
      property,
      photos,
    );
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

  deleteProperty(id: string) {
    const deletedProperty = this.propertyRepository.deleteProperty(id);
    return deletedProperty;
  }
}
