import { FC } from "react";

import Link from "next/link";

import { apiUrl } from "@/app/lib/api";

type ClientsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ClientsPage: FC<ClientsPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const page = typeof params?.page === "string" ? params.page : "1";
  const limit = typeof params?.limit === "string" ? params.limit : "10";

  const res = await fetch(apiUrl(`/api/clients?page=${page}&limit=${limit}`), {
    cache: "no-store",
  });
  const { items, pagination } = await res.json();

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
              href={`/clients?page=${pagination.page - 1}&limit=${pagination.limit}`}
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
              href={`/clients?page=${pagination.page + 1}&limit=${pagination.limit}`}
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
