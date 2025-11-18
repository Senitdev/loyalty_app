// src/hooks/useTransaction.ts
import { useState } from "react";
import API_BASE_URL from "../url_api/api";
export default function useTransaction() {
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState({
    id: "",
    created_at: "",
    type: "",
    points: "",
  });
  const getTransaction = async (merchantId: string,startDate:string,endDate:string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/transaction/merchant/${merchantId}/${startDate}/${endDate}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des transactions");
      const data = await res.json();
      setTransaction(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { transaction, getTransaction, error };
}
