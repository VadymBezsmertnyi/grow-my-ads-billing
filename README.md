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
- Subscription pausing (paused clients cannot generate invoices; visible and filterable in UI)
- First-invoice proration when subscription starts mid-month
- Stripe payment intent creation (test mode); payment intent id stored, displayed, and copyable in UI

## Invoice Calculation

- `rawFee = adSpend * feeRate`
- `calculatedFee = max(rawFee, minimumFee)`
- `discountAmount = calculatedFee * (discountPercent / 100)`
- `finalFee = calculatedFee - discountAmount`
- Snapshot fields (`feeRateSnapshot`, `minimumFeeSnapshot`, `discountSnapshot`) preserve historical values on each invoice
- **Proration:** Applied only to the first invoice when `subscriptionStartDate` falls inside the billing month (ratio = remaining days in month / total days). Discount is still applied after the minimum fee check.

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
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

## Seeded Data

Default plans created by the seed script:

| Plan    | Fee Rate | Minimum Fee |
| ------- | -------- | ----------- |
| Basic   | 10%      | $500        |
| Pro     | 8%       | $1,000      |
| Premium | 5%       | $2,000      |

## Bonus Features

- **Subscription pausing:** Paused clients cannot generate new invoices; pause state is visible and filterable on the clients page
- **First-month proration:** When a client has a subscription start date within the billing month and no prior invoices, fee and minimum are prorated by remaining days in the month
- **Stripe PaymentIntent integration (test mode):** Create a PaymentIntent for an invoice; id is stored and shown in the UI with a copy button
