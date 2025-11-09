"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditRewardPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points_required: "",
    isactive: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🧭 Charger les données du backend
  useEffect(() => {
    if (!id) return;

    async function fetchReward() {
      try {
        const res = await fetch(`http://127.0.0.1:9090/api/v1/reward/${id}`);
        if (!res.ok) throw new Error("Erreur lors du chargement de la récompense");
        const data = await res.json();

        setFormData({
          title: data.title || "",
          description: data.description || "",
          points_required: data.points_required?.toString() || "",
          isactive: data.isactive ?? true,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReward();
  }, [id]);

  // ✍️ Gérer les modifications des champs
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

  // 💾 Soumettre la modification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:9090/api/v1/reward/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          points_required: parseInt(formData.points_required),
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      alert("Récompense modifiée avec succès !");
      router.push("/merchant/rewards/liste");
    } catch (err) {
      alert("Erreur : " + err);
    }
  };

  if (loading)
    return <p className="text-gray-400 text-center mt-10">Chargement...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10">Erreur : {error}</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 text-white mt-6">
      <div className="mb-4">
        <Link
          href="/merchant/rewards"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium underline"
        >
          ← Retour à la liste
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">
        ✏️ Modifier une Récompense
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          />
        </div>

        {/* Points requis */}
        <div>
          <label className="block text-sm font-medium mb-1">Points requis</label>
          <input
            type="number"
            name="points_required"
            value={formData.points_required}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* Statut actif */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isactive"
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
