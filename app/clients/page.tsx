import { FC } from "react";

import Link from "next/link";

const ClientsPage: FC = () => (
  <div className="min-h-screen p-8">
    <nav className="mb-8 flex gap-4">
      <Link href="/" className="text-zinc-600 hover:text-zinc-900">
        Home
      </Link>
      <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-900">
        Dashboard
      </Link>
      <Link href="/invoices" className="text-zinc-600 hover:text-zinc-900">
        Invoices
      </Link>
    </nav>
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Clients</h1>
      <Link
        href="/clients/new"
        className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
      >
        New Client
      </Link>
    </div>
    <p className="text-zinc-600">Client list.</p>
  </div>
);

export default ClientsPage;
