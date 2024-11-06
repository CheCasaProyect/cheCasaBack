import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { Property } from 'src/entities/property.entity';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class FileUploadRepository {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
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
      try {
        const uploadImg = await this.cloudinaryService.uploadImage(file);
        if (!uploadImg || uploadImg === undefined || uploadImg === null) {
          throw new ConflictException(`No se subió la imagen correctamente`);
        }
        foundUser.profileImgUrl = uploadImg.secure_url;
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new ConflictException(error.message);
        }
        throw new ConflictException(`No se pudo subir la imágen correctamente`);
      }
      await this.userDBRepository.save(foundUser);
      return foundUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
    }
  }
}
