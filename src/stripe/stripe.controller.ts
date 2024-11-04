import {
  Body,
  Controller,
  Post,
  Headers,
  Req,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request, Response } from 'express';
import stripe from 'stripe';
import { CreatePaymentDto } from 'src/dtos/createPaymentDto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('createPayment')
  async createPaymentIntent(@Body('amount') amount: number) {
    return this.stripeService.createPaymentIntent(amount);
  }

  @Post('webhooks')
  async handleWebhookEvent(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret,
      );
    } catch (err) {
      throw new BadRequestException('Webhook error: ${err.message}');
    }

    if (event.type === 'product.created' || event.type === 'product.updated') {
      const product = event.data.object;
    }
    return { received: true };
  }

  @Post('testingPayments')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const sessionurl = await this.stripeService.createCheckoutSession(
      createPaymentDto.stripePriceId,
    );
    return { url: sessionurl };
  }
}
