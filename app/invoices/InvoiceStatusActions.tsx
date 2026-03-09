"use client";

import { FC, useState } from "react";

import { useRouter } from "next/navigation";

type InvoiceStatusActionsProps = {
  invoiceId: string;
  status: string;
};

const InvoiceStatusActions: FC<InvoiceStatusActionsProps> = ({
  invoiceId,
  status,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusUpdate = async (newStatus: "SENT" | "PAID") => {
    setLoading(newStatus);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error ?? "Failed to update status");
      }
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const canMarkSent = status === "DRAFT";
  const canMarkPaid = status === "SENT";
  if (!canMarkSent && !canMarkPaid)
    return <span className="text-zinc-500">—</span>;

  return (
    <div className="flex gap-1">
      {canMarkSent && (
        <button
          type="button"
          onClick={() => handleStatusUpdate("SENT")}
          disabled={loading !== null}
          className="rounded border border-zinc-300 px-2 py-1 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {loading === "SENT" ? "…" : "Mark as Sent"}
        </button>
      )}
      {canMarkPaid && (
        <button
          type="button"
          onClick={() => handleStatusUpdate("PAID")}
          disabled={loading !== null}
          className="rounded border border-zinc-300 px-2 py-1 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {loading === "PAID" ? "…" : "Mark as Paid"}
        </button>
      )}
    </div>
  );
};

export default InvoiceStatusActions;
