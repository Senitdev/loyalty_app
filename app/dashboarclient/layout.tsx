"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-4 fixed md:static top-0 left-0 h-full z-20`}
      >
        <h2 className="text-xl font-bold mb-6">Loyalty Program</h2>
        <nav className="space-y-2">
          <Link href="/dashboarclient" className="block py-2 px-3 rounded-lg hover:bg-zinc-800" onClick={()=>setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/dashboarclient/transactions" className="block py-2 px-3 rounded-lg hover:bg-zinc-800" onClick={()=>setMenuOpen(false)}>
            Transactions
          </Link>
             <Link href="/dashboarclient/merchant" className="block py-2 px-3 rounded-lg hover:bg-zinc-800" onClick={()=>setMenuOpen(false)}>
            Abonnements
          </Link>
        </nav>
      </aside>

      {/* Top Bar (mobile) */}
      <header className="flex items-center justify-between p-4 bg-zinc-900 shadow md:hidden border-b border-zinc-800">
        <h1 className="font-bold text-lg">Client Dashboard</h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:ml-64 mt-16 md:mt-0">{children}</main>
    </div>
  );
}
