import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PropertyRepository } from 'src/property/property.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class PropertyGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly propertyRepository: PropertyRepository
  ){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const propertyId = request.body?.propertyId;

    const property = await this.propertyRepository.getPropertyById(propertyId);
    if(!property) {
      return false
    }
    if(property.owner.id !== user.id){
      return false
    }
    return true;
  }
}
