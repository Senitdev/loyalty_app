"use client";
import { useEffect, useState } from "react";
import useGetTransactionClient from "../../hooks/useGetTransactionClient";
import useAuthGuard from "@/app/hooks/useAuthGuard";
export default function ClientTransaction(){
  const authorized = useAuthGuard("client");
    if (!authorized) return null;
      const{transactionClient,getTransactionClient}=useGetTransactionClient()
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      const [startDate, setStartDate] = useState(formattedDate);
      const [endDate, setEndDate] = useState(formattedDate);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const cliendID=3; // ID client fixe pour l'exemple
      const handleSearch = async () => {
    if (!startDate || !endDate) {
      setError("Veuillez saisir les deux dates.");
      return;
    }
  //  setError("");
    setLoading(true);
    getTransactionClient(cliendID,startDate,endDate)
  };
  useEffect(()=>{
    getTransactionClient(cliendID,startDate,endDate)
  },[setStartDate,endDate])
    return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mt-6 mb-2">
        Rechercher des transactions
      </h3>

      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded border border-zinc-700 bg-zinc-900 text-white"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded border border-zinc-700 bg-zinc-900 text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
        >
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </div>
       {error && <p className="text-red-500 mb-2">{error}</p>}
      <h3 className="text-lg font-semibold mt-4 mb-2">Liste transactions</h3>
      <div className="bg-zinc-900 rounded-xl shadow p-4 border border-zinc-800 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-zinc-800">
              <th className="py-2">Date</th>
              <th className="py-2">Marchand</th>
              <th className="py-2">Type</th>
              <th className="py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {transactionClient && transactionClient.length > 0 ? (
              transactionClient.map((tx,id) => (
                <tr
                key={id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  <td className="py-2 px-3 text-gray-300">
                    {new Date(tx.created_at).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    className={`py-2 px-3 font-medium ${
                      tx.type === "earn"
                        ? "text-green-400"
                        : tx.type === "spens"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    {tx.merchant}
                  </td>
                  <td className="py-2 px-3">{tx.type}</td>
                  <td className="py-2 px-3">{tx.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-400">
                  Aucune transaction trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}