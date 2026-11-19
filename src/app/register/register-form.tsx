"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/src/lib/auth-client";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export const RegisterForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.trim().length < 2) {
      setError("Escribe un nombre válido de al menos 2 caracteres.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Introduce un correo electrónico válido (ej. tu@email.com).");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (error) {
        const msg = error.message?.toLowerCase() || "";
        if (msg.includes("already exists") || msg.includes("exist")) {
          setError("Este correo ya está registrado. Inicia sesión.");
        } else if (msg.includes("invalid email")) {
          setError("El formato del correo electrónico no es válido.");
        } else if (msg.includes("password")) {
          setError("La contraseña debe tener al menos 8 caracteres.");
        } else {
          setError("No se pudo crear la cuenta. Inténtalo de nuevo.");
        }
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Ha ocurrido un error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f4ff] p-6">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-purple-300 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-[#c8f36d] opacity-20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-[#ebe5f8] bg-white p-8 shadow-xl shadow-purple-500/5">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c8f36d] shadow-md">
            <IoCheckmarkCircleOutline className="text-3xl text-[#33421c]" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[#242038]">
            Task<span className="text-[#a276e8]">Pop</span>
          </h1>
          <p className="mt-1 text-sm text-[#aaa2bd]">
            Crea tu cuenta gratis en segundos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-[#242038]">
              Tu nombre
            </label>
            <input
              type="text"
              autoComplete="name"
              placeholder="Ej. Daniela"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-[#ebe5f8] bg-[#faf8ff] px-4 py-3 text-sm text-[#242038] outline-none transition focus:border-[#a276e8]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-[#242038]">
              Correo electrónico
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-[#ebe5f8] bg-[#faf8ff] px-4 py-3 text-sm text-[#242038] outline-none transition focus:border-[#a276e8]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-[#242038]">
              Contraseña (mínimo 8 caracteres)
            </label>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#ebe5f8] bg-[#faf8ff] px-4 py-3 text-sm text-[#242038] outline-none transition focus:border-[#a276e8]"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-purple-600 to-purple-400 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition hover:opacity-95 disabled:opacity-50"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#6e6782]">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-bold text-[#a276e8] hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
};
