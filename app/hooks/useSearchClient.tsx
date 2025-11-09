import { useState } from "react";

/**
 * Hook pour rechercher un client par email ou téléphone
 * @returns { client, idClient, loading, error, searchClient }
 */
export default function useSearchClient() {
  const [client, setClient] = useState({
    id: "",
    email: "",
    phone: "",
    name: "",
    points: "",
    mobile: "",
  });

  const [idClient, setIdClient] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // 🔍 Fonction de recherche
  const searchClient = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    // 🧹 Réinitialiser le client avant recherche
    setClient({
      id: "",
      email: "",
      phone: "",
      name: "",
      points: "",
      mobile: "",
    });

    try {
      const res = await fetch(`http://localhost:9090/api/v1/clients/search?query=${query}`);
      if (!res.ok) throw new Error("Client introuvable");

      const data = await res.json();
      setClient(data);
      setIdClient(data.id);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return { client, idClient, loading, error, searchClient };
}
