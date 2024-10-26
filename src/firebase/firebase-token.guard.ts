import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authoritation']?.split('Bearer ')[1];

    if(!token) throw new ForbiddenException('You are not logged in');

    try {
      const decodedToken = admin.auth().verifyIdToken(token);
      request.user = decodedToken
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
    return true;
  }
}
