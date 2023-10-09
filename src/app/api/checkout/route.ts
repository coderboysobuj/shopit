import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.itineraryId) {
      throw new Error("Missing itinerary_id");
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Itinerary",
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        itinerary_id: body.itineraryId,
      },
      success_url: `${process.env.URL}/success?itineraryId=${body.itineraryId}`,
      cancel_url: `${process.env.URL}/`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "something went wrong", ok: false },
      { status: 500 }
    );
  }
}
