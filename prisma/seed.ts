import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new pg.Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.plan.createMany({
    data: [
      {
        name: "Basic",
        feeRate: 0.1,
        minimumFee: 500,
      },
      {
        name: "Pro",
        feeRate: 0.08,
        minimumFee: 1000,
      },
      {
        name: "Premium",
        feeRate: 0.05,
        minimumFee: 2000,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Plans created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
