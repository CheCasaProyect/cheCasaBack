import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/entities/users.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccessGuard } from 'src/guards/role.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get All Users' })
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @Get()
  getAllUser() {
    return this.userService.getAllUsers();
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

  @ApiOperation({ summary: 'Deactivate User' })
  @UseGuards(AuthGuard, AccessGuard)
  @Put(':id/deactivate')
  deactivateUser(@Param('id') id: string) {
    return this.userService.deactivateUser(id);
  }

  @ApiOperation({ summary: 'Activate User' })
  @UseGuards(AuthGuard, AccessGuard)
  @Put(':id/activate')
  activateUser(@Param('id') id: string) {
    return this.userService.activeUser(id);
  }

  @ApiOperation({ summary: 'Remove User' })
  @UseGuards(AuthGuard, AccessGuard)
  @Delete(':id/delete')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }

  @ApiOperation({ summary: 'Get User By ID' })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update User' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUser: User) {
    return this.userService.updateUser(id, updateUser);
  }
}
