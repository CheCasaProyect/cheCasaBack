import {
  Body,
  Controller,
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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';

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
  @Get(`id`)
  getPropertyById(@Param(`id`) id: string) {
    const repository = this.propertyService.getPropertyById(id);
    return repository;
  }
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Provide property JSON data and upload photos',
    schema: {
      type: 'object',
      properties: {
        propertyData: {
          type: 'string',
          description: 'Property JSON data',
          example: JSON.stringify({
            title: 'Cabaña',
            description: 'Una cabaña acogedora en las montañas',
            state: 'Buenos Aires',
            city: 'La Plata',
            price: 1000,
            isAvailable: true,
            capacity: 4,
            bedrooms: 2,
            bathrooms: 1,
          }),
        },
        photos: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: `photos`, maxCount: 10 }]))
  @Post()
  addProperty(
    @Body(`propertyData`) propertyData: string,
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
  ) {
    const propertyObject = JSON.parse(propertyData);
    const propertyDto = plainToInstance(CreatePropertyDto, propertyObject);
    const newProperty = this.propertyService.addProperty(
      propertyDto,
      files[`photos`] || [],
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
}
