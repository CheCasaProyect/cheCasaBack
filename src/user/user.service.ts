import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async getUserByEmail(email: string){
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async createUser(userData: UserDto) {
    try {
      
      const newUser = await this.userRepository.createUser(userData);
      const { password, ...userWithoutPass } = newUser;
  
      return userWithoutPass;
    } catch (error) {
      throw new BadRequestException('New user not created')
    }
  }

  async updateUser(id: string, updateUser: User): Promise<Partial<User>> {
    const findUser = await this.userRepository.getUserById(id);
    if (!findUser) throw new BadRequestException('User not found');

    const user = Object.assign(findUser, updateUser);

    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }

  async deactivateUser(id: string) {
    return await this.userRepository.deactivateUser(id);
  }

  async activeUser(id: string) {
    return await this.activeUser(id);
  }

  async removeUser(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.removeUser(id);
  }
}
