import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name: string;
    email?: string;
    planId: string;
    discountPercent?: number;
  };

  const { name, email, planId, discountPercent } = body;

  const client = await prisma.client.create({
    data: {
      name,
      email,
      planId,
      discountPercent: discountPercent ?? 0,
    },
  });

  return NextResponse.json(client);
}
