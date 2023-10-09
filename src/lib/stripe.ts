import { env } from '@/config/env'
import { Stripe, loadStripe } from '@stripe/stripe-js';
import StripeInstance from 'stripe'

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export const stripe = new StripeInstance(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

