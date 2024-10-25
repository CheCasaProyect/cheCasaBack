import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from 'src/dtos/userDto';
import { User } from 'src/entities/users.entity';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get All Users' })
  @Get()
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User By ID' })
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get User By Email' })
  @Get('email')
  getUserByEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    console.log('email a buscar: ' + email);
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'Update User' })
  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: User) {
    return this.userService.updateUser(id, updateUser);
  }

  @ApiOperation({ summary: 'Deactivate User' })
  @Put(':id')
  deactivateUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deactivateUser(id);
  }

  @ApiOperation({ summary: 'Activate User' })
  @Put(':id')
  activateUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.activeUser(id);
  }

  @ApiOperation({ summary: 'Remove User' })
  @Delete(':id')
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeUser(id);
  }
}
