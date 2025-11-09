"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function SignupPage() {
  const router = useRouter();
  const[message,setMessage]=useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    birthday: "",
    confirm:""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
     if(formData.confirm!==formData.password){
      setMessage("Les deux mots de passe ne correspondent pas")
     }else{
        setMessage("")
     }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.confirm!==formData.password){
      setMessage("Les deux mots de passe ne correspondent pas")
      return
    }
    try {
      const res = await fetch("http://localhost:9090/api/v1/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors de l'inscription");

      alert("Compte créé avec succès !");
      router.push("/login");
    } catch (err) {
      alert("Erreur : " + err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-zinc-950 text-white px-4 py-8 sm:px-6 lg:px-8">
      {/* LOGO & TITRE */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/icons/logo.png" // 👉 remplace par ton vrai logo
          alt="Logo"
          width={60}
          height={60}
          className="mb-2"
        />
        <h1 className="text-xl font-bold text-center">Créer un compte client</h1>
      </div>

      {/* FORMULAIRE */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-sm sm:max-w-md bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-zinc-800 space-y-4"
      >
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Votre nom complet"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="exemple@mail.com"
          />
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="********"
          />
        </div>
          <div>
          <label className="block text-sm font-medium mb-1">Confirme</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="********"
          />
          <span className="text-sm text-red-700">{message}</span>
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium mb-1">Téléphone</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="06 12 34 56 78"
          />
        </div>

        {/* Date de naissance */}
        <div>
          <label className="block text-sm font-medium mb-1">Date de naissance</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full sm:w-auto px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-center"
          >
            Annuler
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-center"
          >
            S’inscrire
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
