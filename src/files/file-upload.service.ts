import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';

@Injectable()
export class FileUploadService {
  constructor(private readonly fileUploadRepository: FileUploadRepository) {}
  uploadProfileImg(file: Express.Multer.File, userId: string) {
    const updateUser = this.fileUploadRepository.uploadProfileImg(file, userId);
    return updateUser;
  }
  uploadPropertyImg(file: Express.Multer.File, productId: string) {
    const updateProperty = this.fileUploadRepository.uploadPropertyImg(
      file,
      productId,
    );
    return updateProperty;
  }
}
