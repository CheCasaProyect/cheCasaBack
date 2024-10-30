/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import typeOrmConfig from './config/typeorm';
import { DataSource } from 'typeorm';
import { FirebaseModule } from './firebase/firebase.module';
import { PropertyModule } from './property/property.module';
import { FileUploadModule } from './files/file-upload.module';
import { ReservationsModule } from './reservations/reservations.module';
import { FirebaseAdminModule } from './firebase/firebase-admin.module';
import { StripeModule } from './stripe/stripe.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    UserModule,
    FileUploadModule,
    FirebaseAdminModule,
    FirebaseModule,
    PropertyModule,
    ReservationsModule,
    StripeModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    console.log('App iniciada correctamente');
  }
}
