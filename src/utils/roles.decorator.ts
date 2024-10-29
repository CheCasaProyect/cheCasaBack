import { SetMetadata } from '@nestjs/common';
import { Role } from './user.enum';

export const Roles = (...roles: Role[]) => SetMetadata(`roles`, roles);
