"use client";

import { useEffect } from "react";
import useGetAllMerchant from "@/app/hooks/useGetAllMerchant";
import useAuthGuard from "@/app/hooks/useAuthGuard";
export default function ClientMerchants() {

  const { merchants, handleGetMerchants, loading, error } = useGetAllMerchant();

  useEffect(() => {
    handleGetMerchants();
  }, [handleGetMerchants]);
  //On protege la route
  const authorized = useAuthGuard("client");
  if (!authorized) return null;
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-400">
        Chargement des marchands...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 bg-zinc-900 rounded-xl p-4 mt-4">
        Une erreur est survenue lors du chargement des marchands.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 text-white">
        Mes points de fidelites
      </h3>

      <div className="bg-zinc-900 rounded-xl shadow p-4 border border-zinc-800 overflow-x-auto">
        {merchants && merchants.length > 0 ? (
          <table className="w-full text-sm text-gray-200">
            <thead>
              <tr className="text-left text-gray-400 border-b border-zinc-800">
                <th className="py-2 px-2">Date</th>
                <th className="py-2 px-2">Nom</th>
                <th className="py-2 px-2">Adresse</th>
                <th className="py-2 px-2">Téléphone</th>
                <th className="py-2 px-2">Email</th>
                <th className="py-2 px-2 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merch: any) => (
                <tr
                  key={merch.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <td className="py-2 px-2">
                    {merch.created_at
                      ? new Date(merch.created_at).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }): "—"}
                  </td>
                  <td className="py-2 px-2">{merch.name || "—"}</td>
                  <td className="py-2 px-2">{merch.address || "—"}</td>
                  <td className="py-2 px-2">{merch.phone || "—"}</td>
                  <td className="py-2 px-2">{merch.email || "—"}</td>
                  <td className="py-2 px-2 text-right font-medium text-emerald-400">
                    {merch.soldePoints ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400 text-center py-4">
            Aucun marchand trouvé pour ce client.
          </p>
        )}
      </div>
    </div>
  );
}
