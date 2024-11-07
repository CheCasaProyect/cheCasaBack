import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags(`files`)
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiOperation({ summary: 'File Upload Profile Image Url' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  async uploadProfileImg(
    @Param(`id`) userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateUser = await this.fileUploadService.uploadProfileImg(
      file,
      userId,
    );
    return updateUser;
  }
}
