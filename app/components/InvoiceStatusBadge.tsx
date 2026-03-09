import { FC } from "react";

type InvoiceStatusBadgeProps = {
  status: "DRAFT" | "SENT" | "PAID";
};

const statusClasses: Record<"DRAFT" | "SENT" | "PAID", string> = {
  DRAFT:
    "rounded bg-zinc-200 px-2 py-0.5 text-sm text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
  SENT: "rounded bg-blue-100 px-2 py-0.5 text-sm text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  PAID: "rounded bg-green-100 px-2 py-0.5 text-sm text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

const InvoiceStatusBadge: FC<InvoiceStatusBadgeProps> = ({ status }) => (
  <span className={statusClasses[status]}>{status}</span>
);

export default InvoiceStatusBadge;
