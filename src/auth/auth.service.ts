import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/entities/users.entity';
import { Role } from 'src/utils/user.enum';
import { transporter } from 'src/config/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Partial<User>) {
    const { email, password } = user;
    if (!email || !password) throw new BadRequestException('Required');

    const foundUser = await this.userRepository.getUserByEmail(user.email);
    if (foundUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword)
      throw new BadRequestException('Password could not hashed');

    console.log(hashedPassword);

    await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
      isAdmin: false,
    });

    await transporter.sendMail({
      from: '"Te Registraste en CheCasa ✍" <che.casa.proyect@gmail.com>',
      to: user.email,
      subject: 'Registro existoso',
      html: `
          <b>Te has registrado en la página CheCasa correctamente, ahora solo debes iniciar sesión si deseas reservar una propiedad.</b>
          <b>Toca aquí para dirigirte directamente al inicio de sesión en CheCasa: <a href="https://checasafront.onrender.com/login">Ir a Iniciar Sesión</a></b>
          `,
    });

    return 'User created successfully!';
  }

  async login(email: string, password: string) {
    if (!email || !password) throw new BadRequestException('Required');

    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new NotFoundException('Invalid Credentials');

    const passwordValidation = await bcrypt.compare(password, user.password);

    if (!passwordValidation)
      throw new BadRequestException('Invalid Credentials');

    const payload = {
      id: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(payload);

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
      message: 'Loggin successfully!',
      token,
      user,
    };
  }

  async validateUser(profile: any) {
    const { id, emails, displayName} = profile;
    const email = emails[0].value;

    let user = await this.userRepository.getUserByEmail(email);
    if(!user) {
      user = await this.userRepository.createUser({
        email,
        password: null,
        isAdmin: false,
        googleId: id,
     });
    } 
    const payload = { id: user.id, email: user.email, roles: [user.isAdmin ? Role.Admin : Role.User]};
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

}
