import { FC } from "react";

import Link from "next/link";

type ClientDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ClientDetailPage: FC<ClientDetailPageProps> = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="min-h-screen p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/clients" className="text-zinc-600 hover:text-zinc-900">
          ← Clients
        </Link>
        <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-900">
          Dashboard
        </Link>
      </nav>
      <h1 className="text-2xl font-semibold">Client Details</h1>
      <p className="mt-4 text-zinc-600">Client {id} view and edit.</p>
    </div>
  );
};

export default ClientDetailPage;
