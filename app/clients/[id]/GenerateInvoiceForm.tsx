"use client";

import { FC, useState } from "react";

import { useRouter } from "next/navigation";

type GenerateInvoiceFormProps = {
  clientId: string;
};

const GenerateInvoiceForm: FC<GenerateInvoiceFormProps> = ({ clientId }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const [billingMonth, setBillingMonth] = useState(defaultMonth);
  const [adSpend, setAdSpend] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/invoices/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          billingMonth,
          adSpend: Number(adSpend) || 0,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error ?? "Failed to generate invoice");
      }
      setAdSpend("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      {error && (
        <p className="rounded bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </p>
      )}
      <div>
        <label
          htmlFor="billingMonth"
          className="mb-1 block text-sm font-medium"
        >
          Billing month
        </label>
        <input
          id="billingMonth"
          type="month"
          value={billingMonth}
          onChange={(e) => setBillingMonth(e.target.value)}
          required
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="adSpend" className="mb-1 block text-sm font-medium">
          Ad spend *
        </label>
        <input
          id="adSpend"
          type="number"
          min="0"
          step="0.01"
          value={adSpend}
          onChange={(e) => setAdSpend(e.target.value)}
          required
          placeholder="0"
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-fit rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 disabled:opacity-50"
      >
        {submitting ? "Generating…" : "Generate Invoice"}
      </button>
    </form>
  );
};

export default GenerateInvoiceForm;
