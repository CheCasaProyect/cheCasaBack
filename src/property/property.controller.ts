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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Pon los datos de la propiedad y selecciona archivos:',
    schema: {
      type: 'object',
      properties: {
        photos: {
          type: `string`,
          format: `binary`,
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: `photos`, maxCount: 10 }]))
  @HttpCode(201)
  @Post()
  addProperty(
    @Body() property: CreatePropertyDto,
    files: Express.Multer.File[],
  ) {
    const newProperty = this.propertyService.addProperty(property, files);
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
