import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { cloudinaryService } from './cloudinary.service';
import { Property } from 'src/entities/property.entity';

@Injectable()
export class FileUploadRepository {
  constructor(
    private readonly cloudinaryService: cloudinaryService,
    @InjectRepository(User) private readonly userDBRepository: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyDBRepository: Repository<Property>,
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
  async uploadPropertyImg(file: Express.Multer.File, propertyId: string) {
    try {
      const foundProperty = await this.propertyDBRepository.findOne({
        where: { id: propertyId },
      });
      if (!foundProperty) {
        throw new NotFoundException(`Propiedad no encontrada.`);
      }
      const uploadImg = await this.cloudinaryService.uploadImage(file);
      const updateProperty = await this.propertyDBRepository.update(
        propertyId,
        {
          photos: [uploadImg.secure_url],
        },
      );
      return updateProperty;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
