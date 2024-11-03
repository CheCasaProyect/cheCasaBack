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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

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
  async uploadPropertyImg(
    @Param(`id`) userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateUser = await this.fileUploadService.uploadProfileImg(
      file,
      userId,
    );
    return updateUser;
  }

  @ApiOperation({ summary: 'Files Upload Property Images Url' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Selecciona los archivos:',
    schema: {
      type: 'object',
      properties: {
        photos: {
          type: 'array',
          items: { type: `string`, format: `binary` },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor(`photos`))
  @Post(`uploadPropertyImg/:id`)
  async uploadProfileImg(
    @Param(`id`) productId: string,
    @UploadedFile(
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
    console.log(photos);
    const updateProperty = await this.fileUploadService.uploadPropertyImg(
      photos,
      productId,
    );
    return updateProperty;
  }
}
