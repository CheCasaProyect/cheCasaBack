import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/dtos/userDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp' })
  @Post('signup')
  createUser(@Body() user: UserDto) {
    return this.authService.signUp(user);
  }

  @ApiOperation({ summary: 'SignIn' })
  @Post('signin')
  signIn() {}
}
