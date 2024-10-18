import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository){}

    async getUser(){}

    async getUserById(){}

    async getUserByEmail(){}

    async createUser(){}

    async upldateUser(){}

    async removeUser(){}
}
