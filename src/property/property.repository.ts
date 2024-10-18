import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyRepository {
  constructor(
    @InjectRepository(Property)
    private readonly propertyDBRepository: Repository<Property>,
  ) {}
  async getProperties() {
    try {
      const properties = await this.propertyDBRepository.find();
      if (!properties) {
        throw new NotFoundException(`No se encontraron las propiedades`);
      }
      return properties;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
  async getPropertyById(id: string) {
    try {
      const property = await this.propertyDBRepository.findOne({
        where: { id },
      });
      if (!property) {
        throw new NotFoundException(`No se encontró la propiedad`);
      }
      return property;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
  async addProperty(property: CreatePropertyDto) {
    try {
      const newProperty = this.propertyDBRepository.create(property);
      if (!newProperty) {
        throw new ConflictException(`La propiedad no se creó correctamente`);
      }
      const saveProperty = await this.propertyDBRepository.save(newProperty);
      if (!saveProperty) {
        throw new ConflictException(
          `La propiedad no se pudo guardar correctamente en la base de datos`,
        );
      }
      return newProperty;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
    }
  }
}
