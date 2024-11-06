import { Inject, Injectable } from '@nestjs/common';
import { transporter } from 'src/config/mailer';
import { PropertyRepository } from 'src/property/property.repository';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
    private readonly propertyService: PropertyRepository,
  ) {}

  async createPaymentIntent(amount: number, currency: string = 'USD') {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
  }

  async createCheckoutSession(reservation: {
    propertyId: string;
    checkIn: string;
    checkOut: string;
  }) {
    const checkInDate = new Date(reservation.checkIn);
    const checkOutDate = new Date(reservation.checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const property = await this.propertyService.getPropertyById(
      reservation.propertyId,
    );

    if (!property) {
      throw new Error('Propiedad no encontrada');
    }

    const stripePriceId = property.stripePriceId;
    const pricePerNight = property.price;

    const totalPrice = pricePerNight * diffDays;

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: diffDays,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/paymentSucces',
      cancel_url: 'http://localhost:3000/paymentFailed',
    });
    return session.url;
  }
}
