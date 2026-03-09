import type { Metadata } from "next";
import { FC } from "react";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Billing management for Grow My Ads. Overview and navigation.",
};

const HomePage: FC = () => (
  <div className="flex flex-col gap-6">
    <h1 className="text-2xl font-semibold">Grow My Ads Billing</h1>
    <p className="text-zinc-600">Billing management for Grow My Ads.</p>
    <div className="flex flex-col gap-2">
      <Link
        href="/dashboard"
        className="text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        Dashboard
      </Link>
      <Link
        href="/clients"
        className="text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        Clients
      </Link>
      <Link
        href="/invoices"
        className="text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        Invoices
      </Link>
    </div>
  </div>
);

export default HomePage;
