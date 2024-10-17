import { Controller, Post } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileService: FileUploadService) {}

  @ApiOperation({ summary: 'File Upload' })
  @Post()
  uploadImage() {}
}
