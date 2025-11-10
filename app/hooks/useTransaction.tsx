// src/hooks/useTransaction.ts
import { useState } from "react";
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
      const res = await fetch(`http://localhost:9090/api/v1/transaction/merchant/${merchantId}/${startDate}/${endDate}}`);
      if (!res.ok) throw new Error("Erreur lors de la récupération des transactions");
      const data = await res.json();
      setTransaction(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { transaction, getTransaction, error };
}
