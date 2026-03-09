import { apiHandler, ApiError } from "@/src/server/api-handler";
import { prisma } from "@/src/server/prisma";
import { stripe } from "@/src/server/stripe";

export const POST = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) =>
  apiHandler(async () => {
    const { id } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });
    if (!invoice) throw new ApiError("Invoice not found", 404);
    if (invoice.status === "PAID")
      throw new ApiError(
        "Cannot create payment intent for an already paid invoice",
        400
      );

    const amountCents = Math.round(invoice.finalFee * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    await prisma.invoice.update({
      where: { id },
      data: { stripePaymentIntentId: paymentIntent.id },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  });
