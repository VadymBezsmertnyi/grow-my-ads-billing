import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { calculateInvoiceAmount } from "@/src/lib/billing";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    clientId: string;
    adSpend: number;
    billingMonth: string;
  };
  const { clientId, adSpend, billingMonth } = body;
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: { plan: true },
  });
  if (!client)
    return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const { calculatedFee, finalFee } = calculateInvoiceAmount({
    adSpend,
    feeRate: client.plan.feeRate,
    minimumFee: client.plan.minimumFee,
    discountPercent: client.discountPercent,
  });
  const billingMonthDate = new Date(billingMonth);
  const invoice = await prisma.invoice.create({
    data: {
      clientId,
      adSpend,
      billingMonth: billingMonthDate,
      feeRateSnapshot: client.plan.feeRate,
      minimumFeeSnapshot: client.plan.minimumFee,
      discountSnapshot: client.discountPercent,
      calculatedFee,
      finalFee,
      status: "DRAFT",
    },
  });

  return NextResponse.json(invoice);
}
