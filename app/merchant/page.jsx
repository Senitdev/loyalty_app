"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Search, PlusCircle, MinusCircle } from "lucide-react";
import Link from "next/link";
import useSearchClient from "@/app/hooks/useSearchClient";
import useTransaction from "@/app/hooks/useTransaction";
import useGetClient from "../hooks/useGetClient";
import API_BASE_URL from "../url_api/api";
import useAuthGuard from "../hooks/useAuthGuard";
export default function MerchantDashboard() {
  const authorized = useAuthGuard("merchant");
  if (!authorized) return null;
  const [menuOpen, setMenuOpen] = useState(false);
  const[soldePoint,setSoldePoins]=useState(0)
  const[query,setQuery]=useState("")
   const { client, idClient, loading, error, searchClient } = useSearchClient();
   const{clients,HandleGetClientByMerchant}=useGetClient()
    const MerchantId=3
   const{transaction,getTransaction}=useTransaction()
  useEffect(()=>{
    const LoadSolde=async()=>{
      try{
      const res=await fetch(`${API_BASE_URL}/loyaltycard/merchant/solde/${MerchantId}`,{
        method:"GET",
           headers: { 
             "Content-Type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`
           }
      })
      const data=await res.json()
        if (!res.ok) throw new Error("Erreur fetch");
      setSoldePoins(data.solde)
      }catch(err){
       console.log(err)
      }
     
    }
    //Historique transaction
     getTransaction(MerchantId,"","")
    //Appel de la fonction load
    //liste des 5 derniers clients
    HandleGetClientByMerchant(MerchantId)
    LoadSolde()
  },[])
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section gauche : Carte de fidélité + Transactions */}
          <section>
            <h2 className="text-xl font-semibold mb-4">My Loyalty Cards</h2>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 flex justify-between items-center shadow-md">
              <div>
                <h3 className="text-sm uppercase opacity-80">Loyalty Card</h3>
                <p className="text-5xl font-bold mt-2">{soldePoint}</p>
                <p className="text-sm opacity-80">Points cumulés</p>
              </div>
              <div className="bg-white p-2 rounded-md">
                <img
                  src="/icons/qr-placeholder.png"
                  alt="QR Code"
                  className="w-16 h-16"
                />
              </div>
            </div>

            <Link
              href="#"
              className="text-blue-400 text-sm font-medium mt-3 inline-block hover:underline"
            >
              View Details
            </Link>

            <h3 className="text-lg font-semibold mt-6 mb-2">
              Recent Transactions
            </h3>

            <div className="bg-zinc-900 rounded-xl shadow p-4 border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-zinc-800">
                    <th className="py-2">Date</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
              {transaction && transaction.length > 0 ? (
              transaction.map((tx) => (
                <tr
                  key={tx.id}
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
                    {tx.type === "earn" ? "earn (+)" : "spens (-)"}
                  </td>
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
               <Link
              href="/merchant/transactions"
              className="text-blue-400 text-sm font-medium mt-3 inline-block hover:underline"
            >
              View Details
            </Link>
            </div>
          </section>

          {/* Section droite : Liste des clients */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent clients</h2>

            <div className="bg-zinc-900 rounded-xl shadow p-4 border border-zinc-800">
              <div className="flex gap-2 mb-3">
                       <input
                         type="text"
                         placeholder="Téléphone ou Email"
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                       />
                       <button
                         onClick={() =>searchClient(query)}
                         disabled={loading}
                         className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-2"
                       >
                         <Search size={18} />
                         <span className="hidden sm:inline"></span>
                       </button>
                     </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-zinc-800">
                    <th className="py-2">Name</th>
                    <th className="py-2">Mobile</th>
                    <th className="py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                {clients && clients.length>0 ?(
                  clients.map((cls)=>(
                <tr
                  key={cls.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                <td className="py-2 px-3 text-gray-300">{cls.name}</td>
                <td className="py-2 px-3 text-gray-300">{cls.mobile}</td>
                <td className="py-2 px-3 text-gray-300">{cls.soldepoints}</td>
                </tr>
                  ))
                ):(
                   <tr>
                <td colSpan={3} className="py-4 text-center text-gray-400">
                  Aucune clients inscrits
                </td>
              </tr>

                )}
                </tbody>
              </table>
               {error && <p className="text-red-400 mt-2">{error}</p>}

      {client.id && (
        <div className="mt-4 text-sm">
          <p><strong>Nom :</strong> {client.name}</p>
          <p><strong>Email :</strong> {client.email}</p>
          <p><strong>Téléphone :</strong> {client.mobile}</p>
          <p><strong>ID :</strong> {idClient}</p>
        </div>
      )}
            </div>
          </section>
        </div>
    </div>
  );
}
