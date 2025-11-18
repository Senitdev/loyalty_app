"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import API_BASE_URL from "@/app/url_api/api";
import useGetRewardByMerchant  from "@/app/hooks/useGetRewardByMerchant";
export default function DetailsReward(){
const{ rewards, loading, error, handleGetRewardByMerchant } = useGetRewardByMerchant();
 const router = useRouter();
  const params = useParams();
    const id = params?.id;
    useEffect(() => {

    if (id) {
      handleGetRewardByMerchant(Number(id));
    }
  }, [id]);
    return(
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-6 sm:px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🎁 Les Récompenses du merchant </h2>

      {/* ✅ Vue mobile-first : cartes empilées */}
      <div className="grid gap-4 sm:hidden">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{reward.title}</h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reward.isactive}
                  readOnly
                  className="w-4 h-4 accent-indigo-500"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-3">{reward.description}</p>

            <div className="flex justify-between text-sm text-gray-300">
              <span>Points : {reward.points_required}</span>
              <span>
                {new Date(reward.created_at).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Vue desktop : tableau */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border border-zinc-800">
        <table className="min-w-full bg-zinc-900 text-white border-collapse">
          <thead>
            <tr className="bg-zinc-800 text-sm uppercase text-gray-400">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Titre</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Points</th>
              <th className="px-4 py-2 text-left">Créé le</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map((reward) => (
              <tr
                key={reward.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
              >
                <td className="px-4 py-2">{reward.id}</td>
                <td className="px-4 py-2 font-medium">{reward.title}</td>
                <td className="px-4 py-2">{reward.description}</td>
                <td className="px-4 py-2">{reward.points_required}</td>
                <td className="px-4 py-2">
                  {new Date(reward.created_at).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
