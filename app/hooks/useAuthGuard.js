import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function useAuthGuard(requiredRole) {
const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Aucun token → login
    if (!token) {
      router.push("/");
      return;
    }

    let decoded;
    try {
      decoded = localStorage.getItem("role") // { role, exp, ... }
    } catch (e) {
      localStorage.removeItem("token");
      router.push("/");
      return;
    }

    // Vérifier expiration (exp est en secondes)
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      localStorage.removeItem("token");
      router.push("/");
      return;
    }

    // Vérifier rôle
    if ( decoded !== requiredRole) {
      // Exemple : un client essaie d'accéder à merchant
      router.push("/unauthorized"); 
      return;
    }

    setAuthorized(true);
  }, [requiredRole, router]);

  return authorized;
}
