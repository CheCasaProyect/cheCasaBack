import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException('User not found');

    user.active = false;
    await this.userRepository.save(user);

    return 'Disabled user'
  }

  async activeUser(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException('User not found');

    user.active = true;
    await this.userRepository.save(user);

    return 'Active user'
  }

  removeUser(id: string) {
    return this.userRepository.delete({ id: id });
  }
}
