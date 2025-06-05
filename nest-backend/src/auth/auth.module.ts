import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Module({
  imports: [
    FirebaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, FirebaseAuthGuard],
  controllers: [AuthController]
})
export class AuthModule {}
