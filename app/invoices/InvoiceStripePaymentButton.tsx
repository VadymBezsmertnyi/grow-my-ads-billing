"use client";

import { FC, useState } from "react";

import { useRouter } from "next/navigation";

type InvoiceStripePaymentButtonProps = {
  invoiceId: string;
  status: string;
  stripePaymentIntentId?: string | null;
};

const InvoiceStripePaymentButton: FC<InvoiceStripePaymentButtonProps> = ({
  invoiceId,
  status,
  stripePaymentIntentId,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canCreate = status === "DRAFT" || status === "SENT";

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/payment-intent`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to create payment intent");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!stripePaymentIntentId) return;

    try {
      await navigator.clipboard.writeText(stripePaymentIntentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  if (stripePaymentIntentId)
    return (
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          Payment intent
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-mono text-zinc-900 dark:text-zinc-100">
            {stripePaymentIntentId}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded px-1.5 py-0.5 text-xs text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
            title="Copy"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    );
  if (!canCreate) return <span className="text-zinc-500">—</span>;
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded border border-zinc-300 px-2 py-1 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        {loading ? "…" : "Create Stripe Payment"}
      </button>
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
};

export default InvoiceStripePaymentButton;
