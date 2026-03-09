"use client";

import type { FC } from "react";

import { useRouter } from "next/navigation";

type Plan = { id: string; name: string };

type ClientsFiltersProps = {
  search: string;
  planId: string;
  isActive: string;
  limit: number;
  plans: Plan[];
};

const ClientsFilters: FC<ClientsFiltersProps> = ({
  search,
  planId,
  isActive,
  limit,
  plans,
}) => {
  const router = useRouter();

  const buildParams = (updates: {
    search?: string;
    planId?: string;
    isActive?: string;
    limit?: number;
    page?: number;
  }) => {
    const params = new URLSearchParams();
    params.set("page", String(updates.page ?? 1));
    params.set("limit", String(updates.limit ?? limit));
    const s = updates.search !== undefined ? updates.search : search;
    const p = updates.planId !== undefined ? updates.planId : planId;
    const a = updates.isActive !== undefined ? updates.isActive : isActive;
    if (s) params.set("search", s);
    if (p) params.set("planId", p);
    if (a) params.set("isActive", a);
    return params.toString();
  };

  const updateFilter = (
    key: "search" | "planId" | "isActive" | "limit",
    value: string | number
  ) => {
    const str = String(value);
    const updates: { page: number } & Record<string, string | number> = {
      page: 1,
    };
    if (key === "search") updates.search = str;
    else if (key === "planId") updates.planId = str;
    else if (key === "isActive") updates.isActive = str;
    else if (key === "limit") {
      updates.limit = Number(str) || 10;
      updates.page = 1;
    }
    router.push(`/clients?${buildParams(updates)}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div>
        <label htmlFor="search-filter" className="mr-2 text-sm">
          Search
        </label>
        <input
          id="search-filter"
          type="text"
          value={search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Name or email"
          className="rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="plan-filter" className="mr-2 text-sm">
          Plan
        </label>
        <select
          id="plan-filter"
          value={planId}
          onChange={(e) => updateFilter("planId", e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">All</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="isActive-filter" className="mr-2 text-sm">
          Active
        </label>
        <select
          id="isActive-filter"
          value={isActive}
          onChange={(e) => updateFilter("isActive", e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label htmlFor="limit-filter" className="mr-2 text-sm">
          Per page
        </label>
        <select
          id="limit-filter"
          value={limit}
          onChange={(e) => updateFilter("limit", e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default ClientsFilters;
