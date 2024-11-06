import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PropertyRepository } from 'src/property/property.repository';

export class ReviewsGuard implements CanActivate {
  constructor(private readonly propertyRepository: PropertyRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const propertyId = request.body.propertyId;
      if (!user || !propertyId) {
        throw new NotFoundException(`Usuario o propiedad no encontrado`);
      }
      const property =
        await this.propertyRepository.getPropertyById(propertyId);
      if (!property) {
        throw new NotFoundException(`Propiedad no encontrada`);
      }
      if (property.owner.id === user.id) {
        throw new ForbiddenException(
          `No puedes hacer una reseña a una propiedad la cual seas dueño`,
        );
      }
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
