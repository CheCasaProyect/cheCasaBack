import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { UserRepository } from 'src/user/user.repository';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { transporter } from 'src/config/mailer';

Injectable();
export class ForgotPasswordRepository {
  constructor(
    @InjectRepository(User) private readonly userDBRepository: Repository<User>,
    private readonly userRepository: UserRepository,
  ) {}
  async getEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    await transporter.sendMail({
      from: '"Has olvidado tu contraseña?" <che.casa.proyect@gmail.com>',
      to: user.email,
      subject: 'Cambiar contraseña',
      html: '<b>Para cambiar la contraseña sigue este link:</b>', //Mensaje de prueba. Aqui iría una url que lleve a un formulario de cambio de contraseña.
    });
    return `Verifique su email para cambiar la contraseña`;
  }
  async changePassword(id: string, newPassword: string) {
    const user = await this.userDBRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userDBRepository.save(user);
    return `Contraseña cambiada con éxito`;
  }
}
