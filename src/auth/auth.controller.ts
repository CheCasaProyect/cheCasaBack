import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/userDto';
import { LoginDto } from 'src/dtos/loginDto';

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


  // @ApiOperation({summary: 'Login Google'})
  // @Get('oauth/google')
  // async signinWithGoogle() {}

 
  // @ApiOperation({summary: 'Redirect'})
  // @Get('oauth/google/redirect')
  // async googleOAuthredirect(@Req() req, @Res() res: any) {
  //   this.authService.googleAuthRedirect(req.user, res);
  // }

  
  // @ApiOperation({summary: 'Login Google'})
  // @Post('oauth/google')
  // async signinWithGoogle() {
  //   return { url: 'https://accounts.google.com/o/oauth2/auth?...' };
  // }

}
