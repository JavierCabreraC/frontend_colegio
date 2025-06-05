// Puerto para desarrollo local:
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


// Dirección del host del frontend:
export const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";


// Endpoints de autenticación:
export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_URL}/auth/login/`,
        LOGOUT: `${API_URL}/auth/logout/`,
        PROFESORES: `${API_URL}/auth/profesores/`,
        BITACORA: `${API_URL}/audit/bitacora/`,
        BITACORA_STATS: `${API_URL}/audit/bitacora/stats/`,
    },
    ACADEMIC: {
        MATERIAS: `${API_URL}/academic/materias/`,
        AULAS: `${API_URL}/academic/aulas/`,
        NIVELES: `${API_URL}/academic/niveles/`,
        GESTIONES: `${API_URL}/academic/gestiones/`,
        HORARIOS: `${API_URL}/academic/horarios/`,
        TRIMESTRES: `${API_URL}/academic/trimestres/`,
        MATRICULACIONES: `${API_URL}/academic/matriculaciones/`,
        PROFESOR_MATERIAS: `${API_URL}/academic/profesor-materias/`,
        STATS: `${API_URL}/academic/stats/`,
    },
} as const;
