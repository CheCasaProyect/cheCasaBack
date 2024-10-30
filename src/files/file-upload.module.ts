import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { CloudinaryService } from './cloudinary.service';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';
import { Property } from 'src/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Property])],
  controllers: [FileUploadController],
  providers: [
    CloudinaryService,
    FileUploadService,
    FileUploadRepository,
    CloudinaryConfig,
  ],
})
export class FileUploadModule {}
