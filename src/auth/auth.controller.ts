import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  login(@Body() email: string, password: string) {
    return this.authService.login(email, password);
  }

  @ApiOperation({ summary: 'Google Login' })
  @Post('google-login')
  googleLogin() {
    return this.authService.googleLogin();
  }

  @ApiOperation({ summary: 'Facebook Login' })
  @Post('facebook-login')
  facebookLogin() {
    return this.authService.facebookLogin();
  }

  @ApiOperation({ summary: 'Complete Profile' })
  @Put('complete-profile')
  completeProfile(@Body() user: UserDto) {
    return this.authService.completeProfile(user);
  }
}
