import { FC } from "react";
import Link from "next/link";

// schemas
import { listClientsQuerySchema } from "@/app/api/clients/clients.schemas";
import { listInvoicesQuerySchema } from "@/app/api/invoices/invoices.schemas";

// api
import { listClients } from "@/app/api/clients/clients.service";
import { listInvoices } from "@/app/api/invoices/invoices.service";

// helpers
import { formatCurrency } from "@/app/helpers/currency.helpers";
import { formatDate, formatMonth } from "@/app/helpers/format.helpers";
import { flattenSearchParams } from "@/app/helpers/search-params.helpers";

// components
import InvoiceStatusBadge from "@/app/components/InvoiceStatusBadge";
import InvoiceStatusActions from "./InvoiceStatusActions";
import InvoicesFilters from "./InvoicesFilters";

type InvoicesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const InvoicesPage: FC<InvoicesPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const query = listInvoicesQuerySchema.parse(flattenSearchParams(params));

  const clientsQuery = listClientsQuerySchema.parse({ page: 1, limit: 100 });
  const [{ items, pagination }, { items: clients }] = await Promise.all([
    listInvoices(query),
    listClients(clientsQuery),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Invoices</h1>

      <InvoicesFilters
        status={query.status ?? ""}
        clientId={query.clientId ?? ""}
        clients={clients ?? []}
      />

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
            {items?.map((invoice) => (
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
                <td className="px-4 py-3">{formatCurrency(invoice.adSpend)}</td>
                <td className="px-4 py-3">
                  {formatCurrency(invoice.finalFee)}
                </td>
                <td className="px-4 py-3">
                  <InvoiceStatusBadge status={invoice.status} />
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
                (query.status ? `&status=${query.status}` : "") +
                (query.clientId ? `&clientId=${query.clientId}` : "")
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
                (query.status ? `&status=${query.status}` : "") +
                (query.clientId ? `&clientId=${query.clientId}` : "")
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
