import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ForgotPasswordService } from './forgotPassword.service';

@Controller(`forgot-password`)
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}
  @Get(`:id`)
  getEmail(@Param(`id`) email: string) {
    return this.forgotPasswordService.getEmail(email);
  }
  @Put(`change-password/:id`)
  changePassword(@Param(`id`) id: string, @Body() newPassword: string) {
    return this.forgotPasswordService.changePassword(id, newPassword);
  }
}
