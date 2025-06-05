import { Injectable, HttpException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'firebase-admin/auth';

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

@Injectable()
export class AuthService {
  constructor(@Inject('FIREBASE_AUTH') private firebaseAuth: Auth, private jwt: JwtService) {}

  async signup(email: string, password: string) {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
    const data = await res.json();
    if (!res.ok) throw new HttpException(data.error?.message || 'Firebase error', res.status);
    return data;
  }

  async loginWithEmail(email: string, password: string) {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
    const data = await res.json();
    if (!res.ok) throw new HttpException(data.error?.message || 'Firebase error', res.status);
    return this.loginWithIdToken(data.idToken);
  }

  async loginWithIdToken(idToken: string) {
    const decoded = await this.firebaseAuth.verifyIdToken(idToken);
    const token = await this.jwt.signAsync({ sub: decoded.uid });
    return { token };
  }
}
