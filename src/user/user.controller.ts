import { Controller, Get, Patch, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}


    @ApiOperation({summary: 'Get all users'})
    @Get() 
    getAllUser(){}

    @ApiOperation({summary: 'Get user by ID'})
    @Get(':id')
    getUserById(){}

    @ApiOperation({summary: 'Update User'})
    @Put()
    updateUser(){}

    @ApiOperation({summary: 'Remove User'})
    @Patch()
    removeUser(){}

}
