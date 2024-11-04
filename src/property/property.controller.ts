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

@ApiTags(`property`)
@Controller(`properties`)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @HttpCode(200)
  @Get()
  getProperties() {
    const properties = this.propertyService.getProperties();
    return properties;
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
        state: {
          type: `string`,
          example: `Buenos Aires`,
        },
        city: {
          type: `string`,
          example: `La Plata`,
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
    const newProperty = await this.propertyService.addProperty(
      property,
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

  @Get('coordinates')
  async getCoordinates(
    @Query('state') state: string,
    @Query('city') city: string,
  ) {
    if (!state || !city) {
      throw new BadRequestException('State y City son requeridos');
    }

    try {
      const coordinates = await this.propertyService.getCoordinates(
        state,
        city,
      );
      return coordinates;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(`:id`)
  deleteProperty(@Param(`id`) id: string) {
    const deletedProperty = this.propertyService.deleteProperty(id);
    return deletedProperty;
  }
}
