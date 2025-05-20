export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";

export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_URL}/auth/login/`,
        LOGOUT: `${API_URL}/auth/logout/`,
    },
} as const;
