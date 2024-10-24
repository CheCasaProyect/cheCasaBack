import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { cloudinaryService } from './cloudinary.service';

@Injectable()
export class FileUploadRepository {
  constructor(
    private readonly cloudinaryService: cloudinaryService,
    @InjectRepository(User) private readonly userDBRepository: Repository<User>,
  ) {}
  async uploadProfileImg(file: Express.Multer.File, userId: string) {
    try {
      const foundUser = await this.userDBRepository.findOne({
        where: { id: userId },
      });
      if (!foundUser) {
        throw new NotFoundException(`Usuario no encontrado.`);
      }
      const uploadImg = await this.cloudinaryService.uploadImage(file);
      const updateUser = await this.userDBRepository.update(userId, {
        profileImgUrl: uploadImg.secure_url,
      });
      return updateUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
