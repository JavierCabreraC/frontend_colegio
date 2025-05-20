import { ENDPOINTS } from "./config";
import { UserRole } from "@/types";

interface LoginResponse {
  refresh: string;
  access: string;
  rol: UserRole;
  id: number;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Error en la autenticación");
  }

  return response.json();
}

export async function logout(refreshToken: string): Promise<void> {
  const response = await fetch(ENDPOINTS.AUTH.LOGOUT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Error al cerrar sesión");
  }
} 