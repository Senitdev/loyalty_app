"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import  API_BASE_URL from "../../url_api/api";
import useAuthGuard from "@/app/hooks/useAuthGuard";
export default function NewRewardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points_required:0,
    merchant_id:1,
    isactive: true,
  });
    const authorized = useAuthGuard("merchant");
  if (!authorized) return null;
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const target = e.target;
  const name = target.name;

  let value: string | boolean;
  if (target.type === "checkbox" && target instanceof HTMLInputElement) {
    value = target.checked;
  } else {
    value = target.value;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/reward`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      alert("Récompense ajoutée avec succès !");
      router.push("/merchant/rewards/liste");
    } catch (err) {
      alert("Erreur : " + err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 text-white">
      {/* Lien vers la liste */}
      <div className="mb-4">
        <Link
          href="/merchant/rewards/liste"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium underline"
        >
          ← Voir toutes les récompenses
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Créer une Récompense</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom de la récompense */}
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ex: Café gratuit"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Détail de la récompense..."
          />
        </div>

        {/* Points nécessaires */}
    <div>
      <label className="block text-sm font-medium mb-1">Points requis</label>
      <input
        type="number"
        name="pointsrequired"
         value={formData.points_required || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              points_required: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
            })
          }
        required
        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ex: 100"
      />
    </div>
        {/* Statut actif */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.isactive}
            onChange={handleChange}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label>Activer cette récompense</label>
        </div>

        {/* Boutons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.push("/merchant/rewards")}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg"
          >
            Annuler
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
