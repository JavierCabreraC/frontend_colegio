"use client";
import { useEffect, useState } from "react";
import type { BitacoraStats } from "@/types";
import { getBitacoraStats } from "@/lib/services";


export function BitacoraStats() {
    const [stats, setStats] = useState<BitacoraStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {
        try {
            setLoading(true);
            const data = await getBitacoraStats();
            setStats(data);
            setError("");
        } catch (err) {
            setError("Error al cargar las estadísticas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Cargando estadísticas...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total de acciones */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">Total de Acciones</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total_acciones}</p>
                </div>

                {/* Acciones últimos 7 días */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">Acciones (Últimos 7 días)</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.acciones_ultimos_7_dias}</p>
                </div>
            </div>

            {/* Acciones por tipo */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones por Tipo</h3>
                <div className="space-y-4">
                    {stats.acciones_por_tipo.map((accion) => (
                        <div key={accion.tipo_accion} className="flex justify-between items-center">
                            <span className="text-gray-600">{accion.tipo_accion}</span>
                            <span className="font-medium">{accion.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Usuarios más activos */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Usuarios Más Activos</h3>
                <div className="space-y-4">
                    {stats.usuarios_mas_activos.map((usuario) => (
                        <div key={usuario.usuario__email} className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-900">{usuario.usuario__email}</span>
                                <span className="text-sm text-gray-500 ml-2">({usuario.usuario__tipo_usuario})</span>
                            </div>
                            <span className="font-medium">{usuario.count} acciones</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 