import type { Metadata } from "next";
import { FC } from "react";
import Link from "next/link";

// schemas
import { listClientsQuerySchema } from "@/app/api/clients/clients.schemas";

export const metadata: Metadata = {
  title: "Clients",
  description: "Manage clients, assign plans, and set discounts.",
};

// api
import { listClients } from "@/app/api/clients/clients.service";
import { listPlans } from "@/app/api/plans/plans.service";

// helpers
import { flattenSearchParams } from "@/app/helpers/search-params.helpers";

// components
import ClientsFilters from "./ClientsFilters";

type ClientsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const buildClientsQuery = (query: {
  page: number;
  limit: number;
  search?: string;
  planId?: string;
  isActive?: boolean;
}) => {
  const p = new URLSearchParams();
  p.set("page", String(query.page));
  p.set("limit", String(query.limit));
  if (query.search) p.set("search", query.search);
  if (query.planId) p.set("planId", query.planId);
  if (query.isActive !== undefined) p.set("isActive", String(query.isActive));
  return p.toString();
};

const ClientsPage: FC<ClientsPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const query = listClientsQuerySchema.parse(flattenSearchParams(params));
  const [result, plans] = await Promise.all([listClients(query), listPlans()]);
  const { items, pagination } = result;

  const isActiveStr =
    query.isActive === undefined ? "" : query.isActive ? "true" : "false";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Link
          href="/clients/new"
          className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
        >
          New Client
        </Link>
      </div>

      <ClientsFilters
        search={query.search ?? ""}
        planId={query.planId ?? ""}
        isActive={isActiveStr}
        limit={query.limit}
        plans={plans}
      />

      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Plan
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Discount %
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Active
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {items?.map(
              (client: {
                id: string;
                name: string;
                email: string | null;
                plan: { name: string };
                discountPercent: number;
                isActive: boolean;
              }) => (
                <tr key={client.id}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/clients/${client.id}`}
                      className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                    >
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {client.email ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {client.plan?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {client.discountPercent}%
                  </td>
                  <td className="px-4 py-3">
                    {client.isActive ? (
                      <span className="text-green-600 dark:text-green-400">
                        Yes
                      </span>
                    ) : (
                      <span className="text-zinc-500">No</span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {items?.length === 0 && (
        <p className="text-zinc-600">No clients found.</p>
      )}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center gap-2">
          {pagination.page > 1 && (
            <Link
              href={`/clients?${buildClientsQuery({
                ...query,
                page: pagination.page - 1,
              })}`}
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
              href={`/clients?${buildClientsQuery({
                ...query,
                page: pagination.page + 1,
              })}`}
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

export default ClientsPage;
