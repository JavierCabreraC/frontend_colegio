import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";



export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

interface FetchOptions extends RequestInit {
    requiresAuth?: boolean;
}

export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
    const { requiresAuth = true, headers = {}, ...rest } = options;

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (requiresAuth) {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            throw new Error("No hay token de acceso disponible");
        }
        defaultHeaders["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
        ...rest,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
    }

    return response;
}
