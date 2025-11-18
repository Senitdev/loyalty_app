'use client';
import { useEffect, useState } from "react"
import Link from "next/link";
import useSoldeClient from "../hooks/useSoldeClient";
import useGetTransactionClient from "../hooks/useGetTransactionClient";
export default function Client(){
const{soldePointsClient,HandleGetSoldeClient}=useSoldeClient()
const{transactionClient,getTransactionClient}=useGetTransactionClient()
const clientId=3
const startDate="20250101"
const endDate="20250101"
useEffect(()=>{
  //Obtenir le solde point des clients pour toutes les magazins dont il a une compte
HandleGetSoldeClient()
getTransactionClient(clientId,startDate,endDate)
},[])
return(
<div className="flex flex-col md:flex-row min-h-screen bg-black text-white">    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section gauche : Carte de fidélité + Transactions */}
          <section>
            <h2 className="text-xl font-semibold mb-4">My Loyalty Cards</h2>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 flex justify-between items-center shadow-md">
              <div>
                <h3 className="text-sm uppercase opacity-80">Loyalty Card</h3>
                <p className="text-5xl font-bold mt-2">{soldePointsClient}</p>
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
          {soldePointsClient>0 ?(
             <Link href="/dashboarclient/merchant"
              className="text-blue-400 text-sm font-medium mt-3 inline-block hover:underline"
            >
              View Details
            </Link>

            ):(<></>)}
           

            <h3 className="text-lg font-semibold mt-6 mb-2">
              Recent Transactions
            </h3>
            <div className="bg-zinc-900 rounded-xl shadow p-4 border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-zinc-800">
                    <th className="py-2">Date</th>
                    <th className="py-2">Merchant</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
              {transactionClient && transactionClient.length > 0 ? (
              transactionClient.map((tx) => (
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
                  >{tx.merchant}
                    </td>
                    <td className="py-2 px-3" >{tx.type}</td>
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
              {transactionClient && transactionClient.length>0?(
                   <Link
              href="/dashboarclient/transactions"
              className="text-blue-400 text-sm font-medium mt-3 inline-block hover:underline"
            >
              View Details
            </Link>

              ):(<></>)}
            
            </div>
          </section>
    </div>
    </div>
    )
    }
