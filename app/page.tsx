"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icônes
import API_BASE_URL from "./url_api/api";
export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // 👁️ État visibilité
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Identifiants invalides");

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("email", formData.email);
      console.log("Connexion réussie", data.access_token);
      router.push("/merchant/rewards");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-950 px-4 text-white">
      {/* Logo + titre */}
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/icons/logo.png"
          alt="Loyalty Card Logo"
          width={70}
          height={70}
          className="mb-3"
        />
        <h1 className="text-2xl font-bold">Connexion Loyalty Card</h1>
        <p className="text-gray-400 text-sm mt-1">
          Accédez à votre espace fidélité
        </p>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg space-y-4"
      >
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        {/* Champ email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="exemple@email.com"
          />
        </div>

        {/* Champ mot de passe + icône œil */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 pr-10 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />

          {/* 👁️ Icône visible/masqué */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Bouton connexion */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold transition disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-center text-gray-400 text-sm mt-3">
          Pas encore de compte ?{" "}
          <Link
            href="/inscription"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
