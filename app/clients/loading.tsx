import { FC } from "react";

const ClientsLoading: FC = () => (
  <div className="flex flex-col gap-6">
    <div className="flex items-center justify-between">
      <div className="h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-10 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
    <div className="flex flex-wrap gap-4">
      <div className="h-9 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-9 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-9 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-9 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            {["Name", "Email", "Plan", "Discount %", "Active"].map((col) => (
              <th key={col} className="px-4 py-3 text-left text-sm font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <tr key={i}>
              <td className="px-4 py-3">
                <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ClientsLoading;
