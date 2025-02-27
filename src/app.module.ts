import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import typeOrmConfig from './config/typeorm';
import { DataSource } from 'typeorm';
import { FileUploadModule } from './files/file-upload.module';
import { ReservationsModule } from './reservations/reservations.module';
import { StripeModule } from './stripe/stripe.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CarpiBotModule } from './chatbot/carpibot.module';
import { JwtModule } from '@nestjs/jwt';
import { PropertyModule } from './property/property.module';

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
    PropertyModule,
    ReservationsModule,
    StripeModule,
    ReviewsModule,
    CarpiBotModule,
    ReviewsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
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
