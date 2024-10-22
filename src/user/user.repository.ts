import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private userRepository:
      Repository<User>) {}

      getAllUsers() {
        return this.userRepository.find()
      }

      getUserById(id: string){
        return this.userRepository.findOneBy({id: id})
      }

      getUserByEmail(email: string){
        return this.userRepository.findOneBy({email: email})
      }

      createUser(userData: Partial<User>){
        return this.userRepository.create(userData)
      }

      saveUser(user: User){
        return this.userRepository.save(user)
      }

      userUpdate(id: string, updateUser: Partial<User>){
        return this.userRepository.update(id, updateUser)
      }

      async deactivateUser(id: string){
        const user = await this.userRepository.findOneBy({id: id})
        if(!user) throw new BadRequestException('User not found')
         
        user.active = false
        await this.userRepository.save(user);  
     }

     removeUser(id: string){
      return this.userRepository.delete({id: id})
     }
}

