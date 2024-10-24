import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { cloudinaryService } from './cloudinary.service';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [FileUploadController],
  providers: [
    cloudinaryService,
    FileUploadService,
    FileUploadRepository,
    CloudinaryConfig,
  ],
})
export class FileUploadModule {}
