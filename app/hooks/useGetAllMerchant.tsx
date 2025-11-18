import { useState, useCallback } from "react";
import API_BASE_URL from "../url_api/api";
export interface MerchantDto {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  created_at: string;
  soldePoints: number;
}

export default function useGetAllMerchant(clientId?: number) {
  const [merchants, setMerchants] = useState<MerchantDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetMerchants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const id = clientId ?? 3; // Valeur par défaut si non fournie
      const response = await fetch(`${API_BASE_URL}/loyaltycard/user/merchant/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des marchands");
      }

      const data = await response.json();
      setMerchants(Array.isArray(data) ? data : []);
      console.log("Données des marchands récupérées:", data);
    } catch (err: any) {
      console.error("Erreur API:", err);
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  return { merchants, handleGetMerchants, loading, error };
}
