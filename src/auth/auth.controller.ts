import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/userDto';
import { LoginDto } from 'src/dtos/loginDto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp' })
  @Post('signup')
  signinUp(@Body() user: UserDto) {
    return this.authService.signUp(user);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  login(@Body() login: LoginDto) {
    const { email, password } = login;
    return this.authService.login(email, password);
  }

  @ApiOperation({ summary: 'Google Auth'})
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @ApiOperation({summary: 'Callback Google'})
  @Get('google/callback')
   @UseGuards(AuthGuard('google'))
   async googleAuthRedirect(@Req() req) {
    return this.authService.validateUser(req.user);
   }

}
