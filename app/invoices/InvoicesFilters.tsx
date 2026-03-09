"use client";

import type { FC } from "react";

import { useRouter } from "next/navigation";

type Client = { id: string; name: string };

type InvoicesFiltersProps = {
  status: string;
  clientId: string;
  clients: Client[];
};

const InvoicesFilters: FC<InvoicesFiltersProps> = ({
  status,
  clientId,
  clients,
}) => {
  const router = useRouter();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("limit", "10");
    const nextStatus = key === "status" ? value : status;
    const nextClientId = key === "clientId" ? value : clientId;
    if (nextStatus) params.set("status", nextStatus);
    if (nextClientId) params.set("clientId", nextClientId);
    router.push(`/invoices?${params}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div>
        <label htmlFor="status-filter" className="mr-2 text-sm">
          Status
        </label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">All</option>
          <option value="DRAFT">Draft</option>
          <option value="SENT">Sent</option>
          <option value="PAID">Paid</option>
        </select>
      </div>
      <div>
        <label htmlFor="client-filter" className="mr-2 text-sm">
          Client
        </label>
        <select
          id="client-filter"
          value={clientId}
          onChange={(e) => updateFilter("clientId", e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">All</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InvoicesFilters;
