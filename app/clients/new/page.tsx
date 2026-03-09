import { FC } from "react";

import Link from "next/link";

const NewClientPage: FC = () => (
  <div className="min-h-screen p-8">
    <nav className="mb-8 flex gap-4">
      <Link href="/clients" className="text-zinc-600 hover:text-zinc-900">
        ← Clients
      </Link>
      <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-900">
        Dashboard
      </Link>
    </nav>
    <h1 className="text-2xl font-semibold">New Client</h1>
    <p className="mt-4 text-zinc-600">Create a new client.</p>
  </div>
);

export default NewClientPage;
