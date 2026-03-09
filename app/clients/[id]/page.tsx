import type { Metadata } from "next";
import { FC } from "react";
import Link from "next/link";

// api
import { listPlans } from "@/app/api/plans/plans.service";

export const metadata: Metadata = {
  title: "Client",
  description:
    "View and edit client details, generate invoices, and view invoice history.",
};

// helpers
import { formatCurrency } from "@/app/helpers/currency.helpers";
import { formatDate, formatMonth } from "@/app/helpers/format.helpers";
import { fetchClientOrNull } from "./client-details.helpers";

// components
import InvoiceStatusBadge from "@/app/components/InvoiceStatusBadge";
import InvoiceStripePaymentButton from "@/app/invoices/InvoiceStripePaymentButton";
import ClientEditForm from "./ClientEditForm";
import GenerateInvoiceForm from "./GenerateInvoiceForm";

type ClientDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ClientNotFound = () => (
  <div className="flex flex-col gap-4">
    <Link
      href="/clients"
      className="text-sm text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
    >
      ← Back to clients
    </Link>
    <p className="text-red-600">Client not found.</p>
  </div>
);

const ClientDetailPage: FC<ClientDetailPageProps> = async ({ params }) => {
  const { id } = await params;
  const [client, plans] = await Promise.all([
    fetchClientOrNull(id),
    listPlans(),
  ]);

  if (!client) return <ClientNotFound />;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/clients"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← Back to clients
        </Link>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Client</h2>
        <dl className="grid gap-2 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-400">Name</dt>
            <dd className="font-medium">{client.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-400">Email</dt>
            <dd>{client.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-400">Plan</dt>
            <dd>{client.plan?.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-400">
              Discount %
            </dt>
            <dd>{client.discountPercent}%</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-400">Active</dt>
            <dd>
              {client.isActive ? (
                <span className="text-green-600 dark:text-green-400">Yes</span>
              ) : (
                <span className="text-zinc-500">No</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-400">
              Subscription paused
            </dt>
            <dd>
              {client.isPaused ? (
                <span className="text-amber-600 dark:text-amber-400">Yes</span>
              ) : (
                <span className="text-zinc-500">No</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-600 dark:text-zinc-400">
              Subscription start date
            </dt>
            <dd>
              {client.subscriptionStartDate
                ? formatDate(client.subscriptionStartDate)
                : "—"}
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Edit client</h2>
        <ClientEditForm client={client} plans={plans} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Generate invoice</h2>
        <GenerateInvoiceForm clientId={client.id} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Invoice history</h2>
        {client.invoices?.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
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
                {client.invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {formatMonth(invoice.billingMonth)}
                    </td>
                    <td className="px-4 py-3">
                      {formatCurrency(invoice.adSpend)}
                    </td>
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
                      <InvoiceStripePaymentButton
                        invoiceId={invoice.id}
                        status={invoice.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-zinc-600">No invoices yet.</p>
        )}
      </section>
    </div>
  );
};

export default ClientDetailPage;
