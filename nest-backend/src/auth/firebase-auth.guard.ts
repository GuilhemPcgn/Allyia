import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Auth } from 'firebase-admin/auth';
import { Request } from 'express';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseAuth: Auth) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers['authorization'];
    if (!header) throw new UnauthorizedException('Missing Authorization header');
    const token = header.split('Bearer ')[1];
    if (!token) throw new UnauthorizedException('Invalid Authorization header');
    try {
      request['user'] = await this.firebaseAuth.verifyIdToken(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
