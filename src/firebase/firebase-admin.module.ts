import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: (configService: ConfigService) => {
        const serviceAccount = {
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Reemplaza los saltos de línea
        };
        const adminConfig = {
          /* credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount,
          ), */
          credential: admin.credential.cert(serviceAccount),
          dataBaseURL: process.env.DB_HOST,
        };

        return admin.initializeApp(adminConfig);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}
