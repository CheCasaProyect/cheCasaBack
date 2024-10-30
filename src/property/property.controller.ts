import {
  Body,
  Controller,
  Get,
  Param,
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Pon los datos de la propiedad y selecciona archivos:',
    schema: {
      type: 'object',
      properties: {
        ...CreatePropertyDto,
        'property-photos': {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: `property-photos`, maxCount: 10 }]),
  )
  @Post()
  addProperty(
    @Body() property: CreatePropertyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const newProperty = this.propertyService.addProperty(property, files);
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
