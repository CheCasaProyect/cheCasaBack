import {
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
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from 'src/dtos/createPropertyDto';
import { Property } from 'src/entities/property.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GeocodingService } from './geocodingService';
import { FilterPropertiesDto } from 'src/dtos/filterPropertiesDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PropertyGuard } from 'src/guards/property.guard';

@ApiTags(`property`)
@Controller(`properties`)
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly geocodingService: GeocodingService,
  ) {}
  @HttpCode(200)
  @Get()
  getProperties() {
    const properties = this.propertyService.getProperties();
    return properties;
  }
  @Get('geolocalizacion')
  async getLocalizacion(
    @Body()
    body: {
      street: string;
      number: number;
      city: string;
      state: string;
      postalCode: string;
    },
  ) {
    const { street, number, city, state, postalCode } = body;
    const coordinates = await this.geocodingService.getCoordinates(
      street,
      number,
      city,
      state,
      postalCode,
    );
    return coordinates;
  }

  @HttpCode(201)
  /* @UseGuards(AuthGuard) */
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
          example: `Cabaña familiar en la montaña`,
        },
        street: {
          type: `string`,
          example: `Calle 12`,
        },
        number: {
          type: `number`,
          example: 850,
        },
        postalCode: {
          type: `string`,
          example: 1900,
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
  /* @ApiBearerAuth() */
  @Post()
  async addProperty(
    @Body() property: CreatePropertyDto,
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
    /* @Request() req, */
  ) {
    /* const owner = req.user.id; */
    const newProperty = await this.propertyService.addProperty(
      property,
      photos,
      /* owner, */
    );
    return newProperty;
  }

  @HttpCode(200)
  // @UseGuards(PropertyGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Pon los datos que quieres actualizar y sube imagenes si quieres actualizarlas:',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: `string`,
          example: ``,
        },
        description: {
          type: `string`,
          example: `Cabaña familiar en la montaña`,
        },
        street: {
          type: `string`,
          example: ``,
        },
        number: {
          type: `number`,
          example: ``,
        },
        postalCode: {
          type: `string`,
          example: ``,
        },
        city: {
          type: `string`,
          example: ``,
        },
        state: {
          type: `string`,
          example: ``,
        },
        price: {
          type: `number`,
          example: ``,
        },
        isAvailable: {
          type: `boolean`,
          example: ``,
          default: true,
        },
        capacity: {
          type: `number`,
          example: ``,
        },
        bedrooms: {
          type: `number`,
          example: ``,
        },
        bathrooms: {
          type: `number`,
          example: ``,
        },
        photos: {
          type: 'array',
          items: { type: `string`, format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor(`photos`))
  @Put(`:id`)
  async updateProperty(
    @Param(`id`) id: string,
    @Body() property: UpdatePropertyDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    const updateProperty = await this.propertyService.updateProperty(
      id,
      property,
      photos,
    );
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async filterProperties(
    @Query() query: FilterPropertiesDto,
  ): Promise<Property[]> {
    return this.propertyService.filterProperties(query);
  }

  @Delete(`:id`)
  deleteProperty(@Param(`id`) id: string) {
    const deletedProperty = this.propertyService.deleteProperty(id);
    return deletedProperty;
  }

  @HttpCode(200)
  @Get(`:id`)
  getPropertyById(@Param(`id`) id: string) {
    const repository = this.propertyService.getPropertyById(id);
    return repository;
  }
}
