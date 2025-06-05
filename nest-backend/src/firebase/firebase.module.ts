import { Module, Global } from '@nestjs/common';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: () =>
        initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        }),
    },
    {
      provide: 'FIREBASE_AUTH',
      useFactory: () => getAuth(),
    },
  ],
  exports: ['FIREBASE_AUTH'],
})
export class FirebaseModule {}
