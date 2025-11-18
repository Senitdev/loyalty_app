export interface TransactionDto {
    type: string;
    created_at: string;
    merchant: string;
    points: string;
  }
import { useState } from "react";
import API_BASE_URL from "../url_api/api";
export default function useGetTransactionClient() {
const[transactionClient,setTransactionClient]=useState<TransactionDto[] | null>(null);
  const getTransactionClient = async (clientId: number, startDate: string, endDate: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/transaction/client/${clientId}/${startDate}/${endDate}`,{
        method:"GET",
        headers:{
          "Content-Type":"Application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des transactions");
      const data = await res.json();
      setTransactionClient(data)
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return {transactionClient,getTransactionClient };
}