// Puerto para desarrollo local:
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


// Dirección del host del frontend:
export const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";


// Endpoints de autenticación:
export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_URL}/auth/login/`,
        LOGOUT: `${API_URL}/auth/logout/`,
    },
} as const;
