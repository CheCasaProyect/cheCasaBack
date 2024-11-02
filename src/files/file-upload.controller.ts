import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags(`files`)
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiOperation({ summary: 'File Upload Profile Image Url' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Selecciona el archivo:',
    schema: {
      type: 'object',
      properties: {
        profileImg: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(`uploadProfileImg/:id`)
  @UseInterceptors(FileInterceptor(`profileImg`))
  uploadPropertyImg(
    @Param(`id`) userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 50000000,
            message: 'El archivo no puede pesar 50mb o más',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProfileImg(file, userId);
  }

  @ApiOperation({ summary: 'File Upload Property Image Url' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Selecciona el archivo:',
    schema: {
      type: 'object',
      properties: {
        propertyPhoto: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(`uploadPropertyImg/:id`)
  @UseInterceptors(FileInterceptor(`propertyPhoto`))
  uploadProfileImg(
    @Param(`id`) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 50000000,
            message: 'El archivo no puede pesar 50mb o más',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const updateProperty = this.fileUploadService.uploadProfileImg(
      file,
      productId,
    );
    return {
      message: 'Image uploaded successfully',
      updateProperty,
    };
  }
}
