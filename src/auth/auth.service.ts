import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UserRepository } from 'src/user/user.repository';
import { transporter } from 'src/config/mailer';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(user: Partial<User>) {
    const { email, password } = user;
    if (!email || !password) throw new BadRequestException('Required');

    const existinUser = await this.userRepository.getUserByEmail(user.email);
    if (existinUser) throw new BadRequestException('Email already exists');

    await this.userRepository.createUser(user);

    await this.sendMails();

    console.log(`Mensaje enviado al gmail correctamtente`);

    return 'User created successfully!';
  }

  async sendMails() {
    await transporter.sendMail({
      from: '"Te Registraste en CheCasa 👻" <che.casa.proyect@gmail.com>',
      to: 'che.casa.proyect@gmail.com', //Es un ejemplo, luego tendría que sacar el email del usuario q se registre.
      html: '<b>Te has registrado en la página CheCasa correctamente, ahora solo debes iniciar sesión si deseas reservar una propiedad.</b>',
    });
  }
}
