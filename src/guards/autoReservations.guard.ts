import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PropertyRepository } from 'src/property/property.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AutoReservationsGuard implements CanActivate {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const propertyId = request.body?.propertyId;
      const userId = request.body?.userId;
      if (!propertyId || !userId) {
        throw new NotFoundException(`Propiedad o usuario no encontrado`);
      }
      const user = await this.userRepository.getUserById(userId);
      const property =
        await this.propertyRepository.getPropertyById(propertyId);
      console.log(property.owner);
      if (user.id !== property.owner.id) {
        return true;
      }
      if (user.id === property.owner.id) {
        throw new ForbiddenException(
          `No puedes reservar una propiedad que sea tuya`,
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
