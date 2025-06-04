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

    const finalOptions = {
        ...rest,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
    };

    // ====== LOGGING EN CONSOLA ======
    // Información básica de la petición
    console.group(`🚀 ${finalOptions.method || 'GET'} ${url}`);
    
    // Mostrar método HTTP
    console.log('📋 Método:', finalOptions.method || 'GET');
    
    // Mostrar URL completa
    console.log('🔗 Endpoint:', url);
    
    // Mostrar headers (sin mostrar el token completo por seguridad)
    const headersToLog: Record<string, string> = {};
    if (finalOptions.headers && typeof finalOptions.headers === 'object') {
        for (const [key, value] of Object.entries(finalOptions.headers)) {
            headersToLog[key] = String(value);
        }
    }
    if (headersToLog['Authorization']) {
        headersToLog['Authorization'] = headersToLog['Authorization'].substring(0, 20) + '...';
    }
    console.log('📨 Headers:', headersToLog);
    
    // Mostrar payload si existe
    if (finalOptions.body) {
        try {
            const payload = JSON.parse(finalOptions.body as string);
            console.log('📦 Payload:', payload);
        } catch {
            console.log('📦 Payload (raw):', finalOptions.body);
        }
    }
    
    // Timestamp
    console.log('🕐 Timestamp:', new Date().toISOString());
    console.groupEnd();
    // ====== FIN LOGGING ======

    try {
        const response = await fetch(url, finalOptions);

        // ====== LOGGING DE RESPUESTA ======
        console.group(`${response.ok ? '✅' : '❌'} Respuesta de ${finalOptions.method || 'GET'} ${url}`);
        console.log('📊 Status:', response.status, response.statusText);
        console.log('🕐 Timestamp:', new Date().toISOString());
        
        // Si hay error, intentar mostrar el body del error
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                try {
                    const errorBody = await response.clone().json();
                    console.error('❌ Error Body:', errorBody);
                } catch {
                    console.error('❌ No se pudo parsear el error');
                }
            }
        }
        console.groupEnd();
        // ====== FIN LOGGING RESPUESTA ======

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('🔥 Error en fetchWithAuth:', error);
        throw error;
    }
}
