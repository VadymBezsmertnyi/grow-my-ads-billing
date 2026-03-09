import { apiUrl } from "@/app/lib/api";

const DashboardPage = async () => {
  const res = await fetch(apiUrl("/api/dashboard"), {
    cache: "no-store",
  });
  const data = await res.json();

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
            {data.totalInvoicedCurrentMonth ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Average invoice amount this month
          </p>
          <p className="mt-1 text-2xl font-semibold">
            {data.averageInvoiceAmountCurrentMonth ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
