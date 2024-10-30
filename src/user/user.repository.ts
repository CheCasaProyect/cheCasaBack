import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyRepository } from 'src/property/property.repository';
import { ReservationsRepository } from 'src/reservations/reservations.repository';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly propertyRepository: PropertyRepository,
    private readonly reservationsRepository: ReservationsRepository,

  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  getUserById(id: string) {
    return this.userRepository.findOneBy({ id: id });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  userUpdate(id: string, updateUser: Partial<User>) {
    return this.userRepository.update(id, updateUser);
  }

  async deactivateUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {id},
      relations:['properties', 'reservations']
     });
    if (!user) throw new NotFoundException('User not found');

    user.active = false;
    await this.userRepository.save(user);

    await Promise.all(user.properties.map(async (property) => {
      property.active = false;
      property.isAvailable = false;
      await this.propertyRepository.updateProperty(id, property)
    }))

    if(user.reservations && user.reservations.length > 0) {
      await Promise.all(user.reservations.map(async(reservation) => {
        await this.reservationsRepository.cancelReservation(reservation.id)
      }))
    }

    return 'Disabled user';
  }

  async activeUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    user.active = true;
    await this.userRepository.save(user);

    return 'Active user';
  }

  removeUser(id: string) {
    return this.userRepository.delete({ id: id });
  }
}
