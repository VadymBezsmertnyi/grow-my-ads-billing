import { FC } from "react";

import Link from "next/link";

const DashboardPage: FC = () => (
  <div className="min-h-screen p-8">
    <nav className="mb-8 flex gap-4">
      <Link href="/" className="text-zinc-600 hover:text-zinc-900">
        Home
      </Link>
      <Link href="/clients" className="text-zinc-600 hover:text-zinc-900">
        Clients
      </Link>
      <Link href="/invoices" className="text-zinc-600 hover:text-zinc-900">
        Invoices
      </Link>
    </nav>
    <h1 className="text-2xl font-semibold">Dashboard</h1>
    <p className="mt-4 text-zinc-600">Dashboard overview.</p>
  </div>
);

export default DashboardPage;
