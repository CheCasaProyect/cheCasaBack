import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';
import { Property } from 'src/entities/property.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GeocodingService } from './geocodingService';

@ApiTags(`property`)
@Controller(`properties`)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService,
    private readonly geocodingService: GeocodingService
  ) {}
  @HttpCode(200)
  @Get()
  getProperties() {
    const properties = this.propertyService.getProperties();
    return properties;
  }
  @Get('geolocalizacion')
  async getLocalizacion(@Body() body: {street: string, number: number, city: string, state: string, postalCode: string} ) {
    const { street, number, city, state, postalCode } = body;
    const coordinates = await this.geocodingService.getCoordinates(street, number, city, state, postalCode);
    return coordinates;
  }

  @HttpCode(200)
  @Get(`:id`)
  getPropertyById(@Param(`id`) id: string) {
    const repository = this.propertyService.getPropertyById(id);
    return repository;
  }



  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Pon los datos y sube imagenes:',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: `string`,
          example: `Cabaña`,
        },
        description: {
          type: `string`,
          example: `Cabaña acogedora en la montaña`,
        },
        street: {
          type: `string`,
          example: `Calle 123`,
         },
         number: {
          type: `number`,
          example: 123,
        },
        postalCode: {
          type: `string`,
          example: `1234`,
        },
        city: {
          type: `string`,
          example: `La Plata`,
        },
        state: {
          type: `string`,
          example: `Buenos Aires`,
        },
        price: {
          type: `number`,
          example: 1000,
        },
        isAvailable: {
          type: `boolean`,
          example: true,
        },
        capacity: {
          type: `number`,
          example: 4,
        },
        bedrooms: {
          type: `number`,
          example: 2,
        },
        bathrooms: {
          type: `number`,
          example: 1,
        },
        photos: {
          type: 'array',
          items: { type: `string`, format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor(`photos`))
  @Post()
  async addProperty(
    @Body() property: any,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5000000,
            message: 'El archivo no puede pesar 5mb o más',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg)$/,
          }),
        ],
      }),
    )
    photos: Express.Multer.File[],
  ) {

    const address = `${property.street}, ${property.number}, ${property.city}, ${property.state}, ${property.postalCode}`;
    const coordinates = await this.geocodingService.getCoordinates(property.street,
      property.number,
      property.city,
      property.state,
      property.postalCode,);
    const newProperty = await this.propertyService.addProperty({
      ... property, 
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
     },
      photos,
    );
    return newProperty;
  }

  @HttpCode(200)
  @Put(`:id`)
  updateProperty(@Param(`id`) id: string, @Body() property: UpdatePropertyDto) {
    const updateProperty = this.propertyService.updateProperty(id, property);
    return updateProperty;
  }

  @HttpCode(200)
  @Put(`/deactivate/:id`)
  deacticateProperty(@Param(`id`) id: string) {
    const deactivatedProperty = this.propertyService.deactivateProperty(id);
    return deactivatedProperty;
  }

  @HttpCode(200)
  @Put(`/activate/:id`)
  activateProperty(@Param(`id`) id: string) {
    const activatedProperty = this.propertyService.activateProperty(id);
    return activatedProperty;
  }

  @HttpCode(200)
  @Get('filter')
  async filterProperties(@Query() query: any): Promise<Property[]> {
    return this.propertyService.filterProperties(query);
  }


  @Delete(`:id`)
  deleteProperty(@Param(`id`) id: string) {
    const deletedProperty = this.propertyService.deleteProperty(id);
    return deletedProperty;
  }
}
