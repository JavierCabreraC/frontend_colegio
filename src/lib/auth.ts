import { UserRole } from "@/types";
import { ENDPOINTS } from "./config";
import { fetchWithAuth } from "./utils";



interface LoginResponse {
    refresh: string;
    access: string;
    rol: UserRole;
    id: number;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetchWithAuth(ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        requiresAuth: false,
        body: JSON.stringify({ email, password }),
    });

    return response.json();
}

export async function logout(refreshToken: string): Promise<void> {
    await fetchWithAuth(ENDPOINTS.AUTH.LOGOUT, {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
    });
}
