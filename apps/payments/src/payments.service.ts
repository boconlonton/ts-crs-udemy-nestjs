import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge(
    card: Stripe.PaymentMethodCreateParams.Card1,
    amount: number,
  ) {
    const customer = await this.stripe.customers.create({
      description: 'Test customer',
    });
    await this.stripe.customers.createSource(customer.id, {
      source: 'tok_visa',
    });
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
      customer: customer.id,
    });
    return paymentIntent;
  }
}
