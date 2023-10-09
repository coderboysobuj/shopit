import * as z from 'zod';


const envSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
  NEXTAUTH_SECRET: z.string().nonempty(),
  NEXTAUTH_URL: z.string().nonempty(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().nonempty(),
  STRIPE_SECRET_KEY: z.string().nonempty()
});

export const env = envSchema.parse(process.env);




