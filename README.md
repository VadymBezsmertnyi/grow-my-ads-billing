# Grow My Ads Billing

Billing management system for Grow My Ads. Manages plans, clients, invoices, and dashboard statistics.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma
- PostgreSQL (Neon)
- Tailwind CSS

## Features

- Plans with percentage fee and minimum monthly fee
- Client management (create, update, list)
- Invoice generation
- Invoice status transitions (DRAFT → SENT → PAID)
- Invoice history per client
- Dashboard statistics
- Duplicate invoice protection

## Invoice Calculation

- `rawFee = adSpend * feeRate`
- `calculatedFee = max(rawFee, minimumFee)`
- `discountAmount = calculatedFee * (discountPercent / 100)`
- `finalFee = calculatedFee - discountAmount`
- Snapshot fields (`feeRateSnapshot`, `minimumFeeSnapshot`, `discountSnapshot`) preserve historical values on each invoice

## Status Rules

- **DRAFT** → **SENT** allowed
- **SENT** → **PAID** allowed
- All other transitions are blocked on the server

## Setup

```bash
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Environment Variables

```env
DATABASE_URL=postgresql://...
```

## Seeded Data

Default plans created by the seed script:

| Plan     | Fee Rate | Minimum Fee |
|----------|----------|-------------|
| Basic    | 10%      | $500        |
| Pro      | 8%       | $1,000      |
| Premium  | 5%       | $2,000      |

## Future Improvements

- Stripe integration for invoice payments
