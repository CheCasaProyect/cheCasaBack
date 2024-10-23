import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/users.entity';
import { UserDto } from 'src/dtos/userDto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    const user = await this.userRepository.getAllUsers();
    const userWithoutPass = user.map(
      ({ password, ...userWithoutPass }) => userWithoutPass,
    );

    return userWithoutPass;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new BadRequestException('User not found');

    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('User not found');
  }

  async createUser(userData: UserDto) {
    const newUser = await this.userRepository.createUser(userData);
    await this.userRepository.saveUser(newUser);
    const { password, ...userWithoutPass } = newUser;

    return userWithoutPass;
  }

  async updateUser(id: string, updateUser: User): Promise<Partial<User>> {
    const findUser = await this.userRepository.getUserById(id);
    if (!findUser) throw new BadRequestException('User not found');

    const user = Object.assign(findUser, updateUser);

    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }

  async deactivateUser(id: string) {
    return this.userRepository.deactivateUser(id);
  }

  async activeUser(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new BadRequestException('User not found');

    user.active = true;
    await this.userRepository.saveUser(user);
  }

  async removeUser(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new BadRequestException('User not found');

    await this.userRepository.removeUser(id);
  }
}
