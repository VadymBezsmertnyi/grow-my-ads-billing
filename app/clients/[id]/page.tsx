import { FC } from "react";

import Link from "next/link";

import { apiUrl } from "@/app/lib/api";

import ClientEditForm from "./ClientEditForm";
import GenerateInvoiceForm from "./GenerateInvoiceForm";

type Invoice = {
  id: string;
  billingMonth: string;
  adSpend: number;
  finalFee: number;
  status: string;
  createdAt: string;
};

type Plan = { id: string; name: string };

type Client = {
  id: string;
  name: string;
  email: string | null;
  discountPercent: number;
  isActive: boolean;
  plan: Plan;
  invoices: Invoice[];
};

type ClientDetailPageProps = {
  params: Promise<{ id: string }>;
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

const ClientDetailPage: FC<ClientDetailPageProps> = async ({ params }) => {
  const { id } = await params;
  const [clientRes, plansRes] = await Promise.all([
    fetch(apiUrl(`/api/clients/${id}`), { cache: "no-store" }),
    fetch(apiUrl("/api/plans"), { cache: "no-store" }),
  ]);

  if (!clientRes.ok) {
    return (
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
  }

  const client: Client = await clientRes.json();
  const plans: Plan[] = await plansRes.json();

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
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {client.invoices.map((invoice) => (
                  <tr key={invoice.id}>
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
