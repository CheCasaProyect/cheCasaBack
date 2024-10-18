import { Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly userService: UserService
  ) {}

  @ApiOperation({ summary: 'SignUp' })
  @Post('signup')
  createUser() {

  }

  @ApiOperation({ summary: 'SignIn' })
  @Post('signin')
  signIn() {}
}
