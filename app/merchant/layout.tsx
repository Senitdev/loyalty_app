"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import useAuthGuard from "../hooks/useAuthGuard";
export default function MerchantLayout({ children }: { children: React.ReactNode }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const authorized = useAuthGuard("merchant");
  if (!authorized) return null;
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-4 fixed md:static top-0 left-0 h-full z-20`}
      >
        <h2 className="text-xl font-bold mb-6">Loyalty Program </h2>
        <h6 className="text-sm mb-4 text-blue-700">{localStorage.getItem("email")}</h6>
        <nav className="space-y-2">
          <Link href="/merchant" className="block py-2 px-3 rounded-lg hover:bg-zinc-800" onClick={()=>setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/merchant/clients" className="block py-2 px-3 rounded-lg hover:bg-zinc-800" onClick={()=>setMenuOpen(false)}>
            Clients
          </Link>
          <Link href="/merchant/transactions" className="block py-2 px-3 rounded-lg hover:bg-zinc-800" onClick={()=>setMenuOpen(false)}>
            Transactions
          </Link>
          <Link href="/merchant/rewards" className="block py-2 px-3 rounded-lg hover:bg-zinc-800" onClick={()=>setMenuOpen(false)}>
            Rewards
          </Link>
           <Link href="/deconnexion" className="block py-2 px-3 rounded-lg text-red-400 hover:bg-red-800" onClick={()=>setMenuOpen(false)}>
              Deconnexion
          </Link>
        </nav>
      </aside>

      {/* Top Bar (mobile) */}
      <header className="flex items-center justify-between p-4 bg-zinc-900 shadow md:hidden border-b border-zinc-800">
        <h1 className="font-bold text-lg">Merchant Dashboard</h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:ml-64 mt-16 md:mt-0">{children}</main>
    </div>
  );
}
