import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async signUp(user: Partial<User>){
        const {email, password} = user;
        if(!email || !password) throw new BadRequestException('Required')

        const existinUser = await this.userRepository.getUserByEmail(user.email)
        if(existinUser) throw new  BadRequestException('Email already exists')  
            
            await this.userRepository.createUser(user)

           return 'User created successfully!'
    }

}
