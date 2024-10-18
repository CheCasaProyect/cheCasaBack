import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) 
        private readonly userRepository: UserRepository){}

    async getUser(){}

    async getUserById(){}

    async getUserByEmail(){}

    async createUser(){}

    async upldateUser(){}

    async removeUser(){}
}
