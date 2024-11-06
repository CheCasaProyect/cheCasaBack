import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';

@Injectable()
export class FileUploadService {
  constructor(private readonly fileUploadRepository: FileUploadRepository) {}
  async uploadProfileImg(file: Express.Multer.File, userId: string) {
    const updateUser = await this.fileUploadRepository.uploadProfileImg(
      file,
      userId,
    );
    return updateUser;
  }
}
