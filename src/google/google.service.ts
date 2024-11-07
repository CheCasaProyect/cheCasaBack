import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { transporter } from 'src/config/mailer';

@Injectable()
export class GoogleService {
  private userId: string;
  private readonly SALT_ROUNDS = 10;
  private client: OAuth2Client;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async googleAuthRedirect(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new NotFoundException('Google account not found');
    }
    const user = {
      email: payload.email,
      name: payload.name,
    };

    this.userId = (await this.userRepository.getUserByEmail(user.email))?.id;
    if (!this.userId) {
      this.userId = (await this.userRepository.createUser(user)).id;
    }
    const refreshToken = await this.generateRefreshToken(this.userId);
    const accessToken = await this.generateAccessToken(this.userId);
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      this.SALT_ROUNDS,
    );
    await this.userRepository.updateRefreshToken(
      this.userId,
      hashedRefreshToken,
    );
    // res.cookie('token',
    //   refreshToken, {
    //     maxAge: 3 * 24 * 60 * 60 * 1000,
    //     httpOnly: true, });
    // res.json({
    //   status: 'success',
    //   message: 'Login successfully',
    //   data: { accessToken: accessToken, },
    // });;

    await transporter.sendMail({
      from: '"Iniciaste Sesión en CheCasa 👌" <che.casa.proyect@gmail.com>',
      to: user.email,
      subject: 'Inicio de sesión exitoso',
      html: `
              <b>Has iniciado sesión en la página de CheCasa con éxito, para poder reservar solo debes completar todos los datos de tu perfil.</b>
              <b>Toca aquí para dirigirte directamente al Home de CheCasa: <a href="https://checasafront.onrender.com/">Ir al Home</a></b>
              `,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  private async generateAccessToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '20m',
      },
    );
  }
  private async generateRefreshToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '3d',
      },
    );
  }
}
