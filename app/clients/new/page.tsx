import type { Metadata } from "next";
import { FC } from "react";
import Link from "next/link";

import NewClientForm from "./NewClientForm";

export const metadata: Metadata = {
  title: "New Client",
  description: "Create a new client and assign a plan.",
};

const NewClientPage: FC = () => (
  <div className="flex flex-col gap-6">
    <div>
      <Link
        href="/clients"
        className="text-sm text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        ← Back to clients
      </Link>
    </div>
    <h1 className="text-2xl font-semibold">New Client</h1>
    <NewClientForm />
  </div>
);

export default NewClientPage;
