import type { Metadata } from "next";
import { FC } from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grow My Ads Billing",
    template: "%s | Grow My Ads Billing",
  },
  description:
    "Billing management for Grow My Ads. Manage clients, plans, and invoices.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clients", label: "Clients" },
  { href: "/invoices", label: "Invoices" },
];

const RootLayout: FC<Readonly<RootLayoutProps>> = ({ children }) => (
  <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
    >
      <div className="flex min-h-screen">
        <aside className="w-48 shrink-0 border-r border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded px-3 py-2 text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </body>
  </html>
);

export default RootLayout;
