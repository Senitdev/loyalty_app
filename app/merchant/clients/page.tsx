"use client";

import { useEffect, useState } from "react";
import { Search, PlusCircle, MinusCircle } from "lucide-react";
import API_BASE_URL from "@/app/url_api/api";
import useAuthGuard from "@/app/hooks/useAuthGuard";

export default function ManageClientPoints() {
  

  const [query, setQuery] = useState("");
  const [client, setClient] = useState({
    id: "",
    email: "",
    phone: "",
    name: "",
    points: "",
    mobile: "",
  });

  const [points, setPoints] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [idClient, setIdClient] = useState<number>(0);
  const [soldePoints, setSoldePoints] = useState<number>(0);

  const [formData, setFormData] = useState<{ merchant_id: number; clients_id: number }>(
    {
      merchant_id: 0,
      clients_id: 0,
    }
  );

  // 🔍 Recherche client par email ou téléphone
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setMessage("");

    setClient({
      id: "",
      email: "",
      phone: "",
      name: "",
      points: "",
      mobile: "",
    });

    try {
      const res = await fetch(`${API_BASE_URL}/clients/search?query=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Client introuvable");

      const data = await res.json();
      setClient(data);
      setIdClient(data.id);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mise à jour automatique du marchand + client
  useEffect(() => {
    const merchantId = localStorage.getItem("id");

    if (idClient > 0 && merchantId) {
      const updated = {
        clients_id: idClient,
        merchant_id: Number(merchantId),
      };

      setFormData(updated);
      HandleCheckSolde(updated);
    }
  }, [idClient]);
const authorized = useAuthGuard("merchant");
  if (!authorized) return null;
  // 🔍 Vérifier le solde du client
  const HandleCheckSolde = async (body: {
    merchant_id: number;
    clients_id: number;
  }) => {
    setPoints(0);

    try {
      const request = await fetch(`${API_BASE_URL}/loyaltycard/solde`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      const data = await request.json();
      setSoldePoints(data.points ?? 0);
    } catch (err) {
      console.error("Erreur solde :", err);
      setSoldePoints(0);
    }
  };

  // ➕ Ajouter des points
  const handleAddPoints = async () => {
    if (!idClient || points <= 0) return;

    try {
      const res = await fetch(`${API_BASE_URL}/loyaltycard/add/${points}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors de l’ajout des points");

      setMessage("✅ Points ajoutés avec succès !");
      HandleCheckSolde(formData);
      setPoints(0);
    } catch (err: any) {
      setMessage("❌ " + err.message);
    }
  };

  // ➖ Retirer des points
  const handleRemovePoints = async () => {
    if (!idClient || points <= 0) return;

    if (points > soldePoints) {
      setMessage("❌ Solde points insuffisant");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/loyaltycard/retrait/${points}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors du retrait des points");

      setMessage("✅ Points retirés avec succès !");
      HandleCheckSolde(formData);
      setPoints(0);
    } catch (err: any) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🎯 Gestion Points Client</h2>

      {/* 🔍 Recherche client */}
      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 shadow-lg max-w-md mx-auto">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Téléphone ou Email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-2"
          >
            <Search size={18} />
            <span className="hidden sm:inline">Rechercher</span>
          </button>
        </div>

        {message && (
          <p
            className={`text-center text-sm ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* 📋 Résultat recherche */}
      {idClient > 0 && (
        <div className="mt-6 bg-zinc-900 rounded-xl p-4 border border-zinc-800 shadow-lg max-w-md mx-auto space-y-3">
          <h3 className="text-lg font-semibold text-center mb-2">👤 {client.name}</h3>
          <p className="text-gray-400 text-sm text-center">
            {client.email} · {client.mobile}
          </p>

          <div className="flex justify-between items-center bg-zinc-800 rounded-lg p-3 mt-3">
            <span className="text-gray-300">Solde actuel :</span>
            <span className="text-xl font-bold text-indigo-400">
              {soldePoints} pts
            </span>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="number"
              min="1"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Nombre de points"
            />
          </div>

          <div className="flex justify-between gap-3 mt-3">
            <button
              onClick={handleAddPoints}
              className="flex-1 py-2 bg-green-600 hover:bg-green-500 rounded-lg flex justify-center items-center gap-2 font-semibold"
            >
              <PlusCircle size={18} />
              Ajouter
            </button>
            <button
              onClick={handleRemovePoints}
              className="flex-1 py-2 bg-red-600 hover:bg-red-500 rounded-lg flex justify-center items-center gap-2 font-semibold"
            >
              <MinusCircle size={18} />
              Retirer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
