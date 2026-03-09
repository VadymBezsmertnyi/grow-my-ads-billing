import { FC } from "react";

const DashboardLoading: FC = () => (
  <div className="flex flex-col gap-6">
    <div className="h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="grid gap-4 sm:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-3 h-8 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  </div>
);

export default DashboardLoading;
