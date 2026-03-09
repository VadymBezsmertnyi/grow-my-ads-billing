import { FC } from "react";

import Link from "next/link";

const InvoicesPage: FC = () => (
  <div className="min-h-screen p-8">
    <nav className="mb-8 flex gap-4">
      <Link href="/" className="text-zinc-600 hover:text-zinc-900">
        Home
      </Link>
      <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-900">
        Dashboard
      </Link>
      <Link href="/clients" className="text-zinc-600 hover:text-zinc-900">
        Clients
      </Link>
    </nav>
    <h1 className="text-2xl font-semibold">Invoices</h1>
    <p className="mt-4 text-zinc-600">Invoice list.</p>
  </div>
);

export default InvoicesPage;
