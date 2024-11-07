import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Property } from 'src/entities/property.entity';
import { PropertyRepository } from 'src/property/property.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsGuard implements CanActivate {
  constructor(
    @Inject(Property)
    private readonly propertyRepository: PropertyRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const propertyId = request.body?.propertyId;
      if (!user || !propertyId) {
        throw new NotFoundException(`Usuario o propiedad no encontrado`);
      }
      const property =
        await this.propertyRepository.getPropertyById(propertyId);
      if (!property) {
        throw new NotFoundException(`Propiedad no encontrada`);
      }
      if (!property.owner) {
        return true;
      }
      if (property.owner.id === user.id) {
        throw new ForbiddenException(
          `No puedes hacer eso, porque es tu propiedad`,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new ForbiddenException(error.message);
    }
  }
}
