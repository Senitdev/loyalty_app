"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Inscription() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white px-4">
      <div className="flex flex-col items-center text-center w-full max-w-md bg-zinc-900/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-zinc-800">
        {/* ✅ Logo */}
        <div className="mb-8">
          <Image
            src="/icons/logo.png" // 👉 remplace par ton logo (public/logo.png)
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
          />
        </div>

        {/* ✅ Titre */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          Carte de Fidélité Numérique
        </h1>
        <p className="text-gray-400 mb-10 text-sm sm:text-base">
          Rejoignez notre programme et récompensez la fidélité de vos clients.
        </p>

        {/* ✅ Sous-titre */}
        <div className="text-lg font-semibold mb-6">Veuillez vous inscrire</div>

        {/* ✅ Boutons */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => router.push("/inscription/client")}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-indigo-500/30"
          >
            👤 Client
          </button>

          <button
            onClick={() => router.push("/inscription/merchant")}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-emerald-500/30"
          >
            🏪 Marchand
          </button>
        </div>
      </div>
    </main>
  );
}
