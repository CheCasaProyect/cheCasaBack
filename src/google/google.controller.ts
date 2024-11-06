import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
    constructor(private readonly googleService: GoogleService){}

    @ApiOperation({ summary: 'Login Google' })
    @Post('login')
    async signinWithGoogle(@Body() body: { access_token: string }) {
      const { access_token } = body;
  
      const googleResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`);
      const googleUser = await googleResponse.json();
  
      if (googleUser.error) {
        throw new Error('Token inválido');
      }
    }
  
   
    @ApiOperation({summary: 'Redirect'})
    @Post('/redirect')
    async googleOAuthredirect(@Req() req, @Res() res: any) {
      this.googleService.googleAuthRedirect(req.user, res);
    }
  
}
