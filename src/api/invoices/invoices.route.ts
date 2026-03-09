import { NextResponse } from "next/server";
import { generateInvoiceSchema } from "./invoices.schemas";
import { generateInvoice } from "./invoices.service";

export const POST = async (request: Request) => {
  const body = generateInvoiceSchema.parse(await request.json());
  const result = await generateInvoice(body);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 404 });

  return NextResponse.json(result.invoice);
};
