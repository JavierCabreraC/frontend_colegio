"use client";
import { useState } from "react";
import { login } from "@/lib/auth";
import { RUTAS } from "@/lib/constants";
import { useRouter } from "next/navigation";



export function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);
      
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
      
        try {
            const response = await login(email, password);
            localStorage.setItem("refreshToken", response.refresh);
            localStorage.setItem("accessToken", response.access);

            switch (response.rol) {
              case "director":
                  router.push(RUTAS.DASHBOARD.DIRECTOR);
                  break;
              case "profesor":
                  router.push(RUTAS.DASHBOARD.PROFESOR);
                  break;
              case "alumno":
                  router.push(RUTAS.DASHBOARD.ALUMNO);
                  break;
            }
        } catch (err) {
            setError("Credenciales inválidas");
        } finally {
            setLoading(false);
        }
    }

  return (
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
              </label>
              <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ejemplo@escuela.edu"
              />
          </div>
          <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
              </label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
          </div>
          {error && (
              <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
          >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
      </form>
  );
}
