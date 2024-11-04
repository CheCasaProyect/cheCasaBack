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
import { CloudinaryService } from 'src/files/cloudinary.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PropertyRepository {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-09-30.acacia',
  });
  constructor(
    @InjectRepository(Property)
    private readonly propertyDBRepository: Repository<Property>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly httpService: HttpService,
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

  async addProperty(property: any, photos: Express.Multer.File[]) {
    try {
      const photosArray = [];
      const photosPromises = photos.map(async (file) => {
        try {
          const uploadImg = await this.cloudinaryService.uploadImage(file);
          if (!uploadImg || !uploadImg.secure_url) {
            throw new ConflictException(`No se subió la imágen correctamente`);
          }
          photosArray.push(uploadImg.secure_url);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          throw new ConflictException(`Error uploading files`);
        }
      });
      await Promise.all(photosPromises);

      const stripeProduct = await this.stripe.products.create({
        name: property.title,
        description: property.description,
        images: photosArray,
      });

      const stripePrice = await this.stripe.prices.create({
        unit_amount: property.price * 100,
        currency: 'USD',
        product: stripeProduct.id,
      });

      const newProperty = this.propertyDBRepository.create({
        title: property.title,
        description: property.description,
        state: property.state,
        city: property.city,
        price: Number(property.price),
        isAvailable: property.isAvailable,
        capacity: property.capacity,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        photos: photosArray,
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
      return saveProperty;
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

    if (filters.state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      query.andWhere('property.state = :state'), { state: filters.state };
    }

    if (filters.city) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      query.andWhere('property.city = :city'), { city: filters.city };
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

    if (filters.price && filters.price.length == 2) {
      query.andWhere(
        'property.price >= :minPrice AND property.price <= :maxPrice',
        {
          minPrice: filters.price[0],
          maxPrice: filters.price[1],
        },
      );
    }

    if (filters.bedrooms && filters.bedrooms.length) {
      query.andWhere('property.bedrooms >= :bedrooms', {
        bedrooms: filters.bedrooms[0],
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

  async getCoordinates(state: string, city: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city + ', ' + state)}`;

    try {
      const response = await this.httpService.get(url).toPromise();
      const data = response.data;

      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      } else {
        throw new Error('No se encontraron coordenadas para esta ubicación.');
      }
    } catch (error) {
      throw new Error('Error al obtener las coordenadas.');
    }
  }

  async deleteProperty(id: string) {
    try {
      const foundProperty = await this.propertyDBRepository.findOne({
        where: { id },
      });
      if (!foundProperty) {
        throw new NotFoundException(`Not found property`);
      }
      await this.propertyDBRepository.delete(foundProperty.id);
      return `Propiedad borrada correctamente`;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
