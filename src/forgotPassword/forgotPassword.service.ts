import { Injectable } from '@nestjs/common';
import { ForgotPasswordRepository } from './forgotPassword.repository';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly forgotPasswordRepository: ForgotPasswordRepository,
  ) {}
  getEmail(email: string) {
    return this.forgotPasswordRepository.getEmail(email);
  }
  changePassword(id: string, newPassword: string) {
    return this.forgotPasswordRepository.changePassword(id, newPassword);
  }
}
