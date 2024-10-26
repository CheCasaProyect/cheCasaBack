import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase/app';
import { config as dotenvConfig } from 'dotenv';
import { FirebaseAdminModule } from './firebase-admin.module';
dotenvConfig({ path: '.env' });

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: (configService: ConfigService) => {
        const firebaseConfig = {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
        };

        return firebase.initializeApp(firebaseConfig);
      },
      inject: [ConfigService],
    },
  ],

  exports: ['FIREBASE_APP'],

  imports: [FirebaseAdminModule],
})
export class FirebaseModule {}
