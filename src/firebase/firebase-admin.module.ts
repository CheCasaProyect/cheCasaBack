import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({path: '.env'})

@Module({
    providers: [
        {
            provide: 'FIREBASE_ADMIN',
            useFactory:(configService: ConfigService) => {
                const adminConfig = {
                   credential: admin.credential.applicationDefault(),
                   dataBaseURL: process.env.DB_HOST
                };

                return admin.initializeApp(adminConfig)
            },
            inject: [ConfigService],
        },
    ],
    exports:['FIREBASE_ADMIN']
  
})
export class FirebaseAdminModule {}
