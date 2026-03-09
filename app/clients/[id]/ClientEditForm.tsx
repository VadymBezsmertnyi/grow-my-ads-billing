"use client";

import { FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

type Plan = { id: string; name: string };

type Client = {
  id: string;
  name: string;
  email: string | null;
  discountPercent: number;
  isActive: boolean;
  plan: { id: string; name: string };
};

type ClientEditFormProps = {
  client: Client;
  plans: Plan[];
};

const ClientEditForm: FC<ClientEditFormProps> = ({ client, plans }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email ?? "");
  const [planId, setPlanId] = useState(client.plan.id);
  const [discountPercent, setDiscountPercent] = useState(
    String(client.discountPercent)
  );
  const [isActive, setIsActive] = useState(client.isActive);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email || null,
          planId,
          discountPercent: Number(discountPercent) || 0,
          isActive,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error ?? "Failed to update client");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setName(client.name);
    setEmail(client.email ?? "");
    setPlanId(client.plan.id);
    setDiscountPercent(String(client.discountPercent));
    setIsActive(client.isActive);
  }, [client]);

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      {error && (
        <p className="rounded bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="edit-name" className="mb-1 block text-sm font-medium">
          Name *
        </label>
        <input
          id="edit-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="edit-email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="edit-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="edit-planId" className="mb-1 block text-sm font-medium">
          Plan *
        </label>
        <select
          id="edit-planId"
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
          htmlFor="edit-discountPercent"
          className="mb-1 block text-sm font-medium"
        >
          Discount %
        </label>
        <input
          id="edit-discountPercent"
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
          id="edit-isActive"
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="rounded border-zinc-300"
        />
        <label htmlFor="edit-isActive" className="text-sm font-medium">
          Active
        </label>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-fit rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 disabled:opacity-50"
      >
        {submitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
};

export default ClientEditForm;
