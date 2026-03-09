import type { Metadata } from "next";
import { FC } from "react";

// api
import { getDashboardStats } from "@/app/api/dashboard/dashboard.service";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of active clients, invoicing totals, and averages.",
};

// helpers
import { formatCurrency } from "@/app/helpers/currency.helpers";

const DashboardPage: FC = async () => {
  const data = await getDashboardStats();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Active clients
          </p>
          <p className="mt-1 text-2xl font-semibold">
            {data.activeClientsCount ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Total invoiced this month
          </p>
          <p className="mt-1 text-2xl font-semibold">
            {formatCurrency(data.totalInvoicedCurrentMonth ?? 0)}
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Average invoice amount this month
          </p>
          <p className="mt-1 text-2xl font-semibold">
            {formatCurrency(data.averageInvoiceAmountCurrentMonth ?? 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
