import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';
import { Stripe } from 'stripe';

@Injectable()
export class PropertyRepository {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2024-09-30.acacia'})
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
      const stripeProduct = await this.stripe.products.create({
        name: property.title,
        description: property.description,
        images: property.photos,
      });

      const stripePrice = await this.stripe.prices.create({
        unit_amount: property.price * 100,
        currency: 'ARS',
        product: stripeProduct.id,
      })


      const newProperty = this.propertyDBRepository.create({
        ...property,
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
      });
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

  async updateProperty(id: string, property: UpdatePropertyDto) {
    try {
      const foundProperty = await this.propertyDBRepository.findOne({
        where: { id },
      });
      if (!foundProperty) {
        throw new NotFoundException(`No se encontró la propiedad`);
      }
      const updateProperty = this.propertyDBRepository.update(id, property);
      return updateProperty;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }

  async deactivateProperty(id: string) {
    try {
      const property = await this.propertyDBRepository.findOne({
        where: { id },
      });
      if (!property) {
        throw new NotFoundException(`Property not found`);
      }
      property.active = false;
      property.isAvailable = false;
      await this.propertyDBRepository.save(property);
      return `Se desactivó la propiedad con éxito`;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }

  async activateProperty(id: string) {
    try {
      const property = await this.propertyDBRepository.findOne({
        where: { id },
      });
      if (!property) {
        throw new NotFoundException(`Property not found`);
      }
      property.active = true;
      property.isAvailable = true;
      await this.propertyDBRepository.save(property);
      return `Se activó la propiedad con éxito`;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }

  async filterProperties(filters: any): Promise<Property[]> {
    const query = this.propertyDBRepository.createQueryBuilder('property');

    if (filters.location) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      query.andWhere('property.location = :location'),
        { location: filters.location };
    }

    if (filters.price && filters.price.length == 2) {
      query.andWhere('property.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: filters.price[0],
        maxPrice: filters.price[1],
      });
    }

    if (filters.capacity) {
      query.andWhere('property.capacity >= :capacity', {
        capacity: filters.capacity,
      });
    }

    return await query.getMany();
  }

  async seederProperties() {
    try {
      const data = fs.readFileSync('src/seeder/properties.json', 'utf8');
      const properties = JSON.parse(data);

      for (const property of properties) {
        const existingProperty = await this.propertyDBRepository.findOne({
          where: { title: property.title },
        });
        if (!existingProperty) {
          const newProperty = this.propertyDBRepository.create(property);
          await this.propertyDBRepository.save(newProperty);
          console.log(`Propiedad ${property.title} creada correctamente.`);
        } else {
          console.log(`Propiedad ${property.title} ya existe.`);
        }
      }
      console.log('seeder completo');
    } catch (error) {
      console.error('Error al cargar el seeder:', error);
    }
  }
}
