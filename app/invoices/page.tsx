import { FC } from "react";

import Link from "next/link";

import { apiUrl } from "@/app/lib/api";

import InvoiceStatusActions from "./InvoiceStatusActions";
import InvoicesFilters from "./InvoicesFilters";

type Invoice = {
  id: string;
  clientId: string;
  billingMonth: string;
  adSpend: number;
  finalFee: number;
  status: string;
  createdAt: string;
  client?: { name: string };
};

type Client = { id: string; name: string };

type InvoicesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatMonth = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

const InvoicesPage: FC<InvoicesPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const page = typeof params?.page === "string" ? params.page : "1";
  const limit = typeof params?.limit === "string" ? params.limit : "10";
  const status = typeof params?.status === "string" ? params.status : "";
  const clientId = typeof params?.clientId === "string" ? params.clientId : "";

  const query = new URLSearchParams({ page, limit });
  if (status) query.set("status", status);
  if (clientId) query.set("clientId", clientId);

  const [invoicesRes, clientsRes] = await Promise.all([
    fetch(apiUrl(`/api/invoices?${query}`), { cache: "no-store" }),
    fetch(apiUrl("/api/clients?limit=100"), { cache: "no-store" }),
  ]);

  const { items, pagination } = await invoicesRes.json();
  const clientsData = await clientsRes.json();
  const clients: Client[] = clientsData.items ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Invoices</h1>

      <InvoicesFilters status={status} clientId={clientId} clients={clients} />

      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Client
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Billing month
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Ad spend
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Final fee
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Created
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {items?.map((invoice: Invoice) => (
              <tr key={invoice.id}>
                <td className="px-4 py-3">
                  <Link
                    href={`/clients/${invoice.clientId}`}
                    className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                  >
                    {invoice.client?.name ?? "—"}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {formatMonth(invoice.billingMonth)}
                </td>
                <td className="px-4 py-3">{invoice.adSpend}</td>
                <td className="px-4 py-3">{invoice.finalFee}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      invoice.status === "PAID"
                        ? "text-green-600 dark:text-green-400"
                        : invoice.status === "SENT"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-zinc-600 dark:text-zinc-400"
                    }
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {formatDate(invoice.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <InvoiceStatusActions
                    invoiceId={invoice.id}
                    status={invoice.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items?.length === 0 && (
        <p className="text-zinc-600">No invoices found.</p>
      )}

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center gap-2">
          {pagination.page > 1 && (
            <Link
              href={
                `/invoices?page=${pagination.page - 1}&limit=${pagination.limit}` +
                (status ? `&status=${status}` : "") +
                (clientId ? `&clientId=${clientId}` : "")
              }
              className="rounded border border-zinc-300 px-3 py-1 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-zinc-600">
            Page {pagination.page} of {pagination.pages} ({pagination.total}{" "}
            total)
          </span>
          {pagination.page < pagination.pages && (
            <Link
              href={
                `/invoices?page=${pagination.page + 1}&limit=${pagination.limit}` +
                (status ? `&status=${status}` : "") +
                (clientId ? `&clientId=${clientId}` : "")
              }
              className="rounded border border-zinc-300 px-3 py-1 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;
