import { Inject, Injectable } from '@nestjs/common';
import { transporter } from 'src/config/mailer';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE_CLIENT') private readonly stripe: Stripe) {}

  async createPaymentIntent(amount: number, currency: string = 'USD') {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
  }

  async createCheckoutSession(stripePriceId: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/paymentSucces',
      cancel_url: 'http://localhost:3000/paymentFailed',
    });
    return session.url;
  }
}
