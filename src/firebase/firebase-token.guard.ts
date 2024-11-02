import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject(`FIREBASE_ADMIN`) private readonly firebaseAdmin: admin.app.App,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization']?.split('Bearer ')[1];
      if (!token) throw new ForbiddenException('You are not logged in');
      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
      if (!decodedToken) {
        throw new ForbiddenException(`Failed decoded token`);
      }
      request.user = decodedToken;
      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      }
      throw new UnauthorizedException(`Invalid token`);
    }
  }
}
