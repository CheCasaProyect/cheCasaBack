import { Module } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import Stripe from 'stripe';

dotenvConfig({ path: '.env' });

@Module({
  providers: [
    StripeService,
    {
      provide: 'STRIPE_CLIENT',
      useFactory: () =>
        new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2024-09-30.acacia',
        }),
    },
  ],
  controllers: [StripeController],
})
export class StripeModule {}
