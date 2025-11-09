import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="flex flex-col items-center text-center w-full max-w-md">
        {/* ✅ Titre mobile-first */}
        <h1 className="text-xl sm:text-2xl font-bold mb-12 leading-snug">
          Carte de Fidélité numérique <br /> pour vos meilleurs clients
        </h1>

        {/* ✅ Boutons centrés */}
        <div className="flex flex-col gap-4 w-full">
          <Link
            href="/inscription"
            className="bg-white text-black font-semibold py-3 rounded-xl shadow-md text-base sm:text-lg hover:bg-gray-200 transition"
          >
            S’inscrire
          </Link>

          <Link
            href="/login"
            className="border border-white text-white font-semibold py-3 rounded-xl text-base sm:text-lg hover:bg-white hover:text-black transition"
          >
            Se connecter
          </Link>
        </div>

        {/* ✅ Footer optionnel (visible sur mobile) */}
        <p className="mt-10 text-sm text-gray-400">
          © 2025 CarteFid — Tous droits réservés
        </p>
      </div>
    </main>
  );
}
