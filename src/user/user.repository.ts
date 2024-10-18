import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private userRepository:
      Repository<User>) {}
}