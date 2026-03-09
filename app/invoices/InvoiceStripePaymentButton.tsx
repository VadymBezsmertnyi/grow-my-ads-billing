"use client";

import { FC, useState } from "react";

import { useRouter } from "next/navigation";

type InvoiceStripePaymentButtonProps = {
  invoiceId: string;
  status: string;
};

const InvoiceStripePaymentButton: FC<InvoiceStripePaymentButtonProps> = ({
  invoiceId,
  status,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canCreate = status === "DRAFT" || status === "SENT";
  if (!canCreate) return <span className="text-zinc-500">—</span>;

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/payment-intent`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to create payment intent");
      }
      setSuccess(`Payment intent created: ${data.paymentIntentId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
      {success && (
        <span className="text-xs text-green-600 dark:text-green-400">
          {success}
        </span>
      )}
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
};

export default InvoiceStripePaymentButton;
