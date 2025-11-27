"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
export default function useAuthGuard(requiredRole) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    // Aucun token → redirection vers login
     const token = localStorage.getItem("token");
     const  id=Number(localStorage.getItem("id"))
    if (!token|| id<1) {
      router.push("/");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token); // ✅ décoder correctement
    } catch (e) {
      // Token invalide → supprimer et rediriger
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      router.push("/");
      return;
    }

    // Vérifier expiration
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      router.push("/");
      return;
    }

    // Vérifier rôle
    if (requiredRole && decoded.role !== requiredRole) {
      router.push("/unauthorized"); 
      return;
    }

    setAuthorized(true);
  }, [requiredRole, router]);

  return authorized;
}
