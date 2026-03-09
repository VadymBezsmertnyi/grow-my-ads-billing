"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Plan = { id: string; name: string };

const NewClientForm: FC = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [planId, setPlanId] = useState("");
  const [discountPercent, setDiscountPercent] = useState("0");
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email || undefined,
          planId,
          discountPercent: Number(discountPercent) || 0,
          isActive,
          isPaused,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error ?? "Failed to create client");
      }
      router.push("/clients");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        if (data[0]) setPlanId(data[0].id);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-zinc-600">Loading plans…</p>;
  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      {error && (
        <p className="rounded bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="planId" className="mb-1 block text-sm font-medium">
          Plan *
        </label>
        <select
          id="planId"
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
          required
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="discountPercent"
          className="mb-1 block text-sm font-medium"
        >
          Discount %
        </label>
        <input
          id="discountPercent"
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="isActive"
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="rounded border-zinc-300"
        />
        <label htmlFor="isActive" className="text-sm font-medium">
          Active
        </label>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="isPaused"
          type="checkbox"
          checked={isPaused}
          onChange={(e) => setIsPaused(e.target.checked)}
          className="rounded border-zinc-300"
        />
        <label htmlFor="isPaused" className="text-sm font-medium">
          Subscription paused
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {submitting ? "Creating…" : "Create Client"}
        </button>
        <Link
          href="/clients"
          className="rounded border border-zinc-300 px-4 py-2 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default NewClientForm;
