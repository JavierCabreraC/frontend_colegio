"use client";
import { useEffect, useState } from "react";
import { EstadisticasAcademicas } from "@/types";
import { getEstadisticasAcademicas } from "@/lib/services";
import { generateReportesPDF } from "@/lib/pdf-utils";
import { generateReportesExcel } from "@/lib/excel-utils";

export function ReportesList() {
    const [stats, setStats] = useState<EstadisticasAcademicas | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {
        try {
            setLoading(true);
            const response = await getEstadisticasAcademicas();
            setStats(response);
            setError("");
        } catch (err) {
            setError("Error al cargar las estadísticas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleDownloadPDF = () => {
        if (stats) {
            generateReportesPDF(stats);
        }
    };

    const handleDownloadExcel = () => {
        if (stats) {
            generateReportesExcel(stats);
        }
    };

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
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Reportes Institucionales</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownloadExcel}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Excel
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        PDF
                    </button>
                </div>
            </div>

            {/* Estadísticas Generales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen General</h3>
                    <dl className="space-y-3">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Total Materias</dt>
                            <dd className="text-2xl font-semibold text-gray-900">{stats.estadisticas.total_materias}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Total Aulas</dt>
                            <dd className="text-2xl font-semibold text-gray-900">{stats.estadisticas.total_aulas}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Total Niveles</dt>
                            <dd className="text-2xl font-semibold text-gray-900">{stats.estadisticas.total_niveles}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Total Grupos</dt>
                            <dd className="text-2xl font-semibold text-gray-900">{stats.estadisticas.total_grupos}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Materias sin Profesor</dt>
                            <dd className="text-2xl font-semibold text-gray-900">{stats.estadisticas.materias_sin_profesor}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Aulas Disponibles</dt>
                            <dd className="text-2xl font-semibold text-gray-900">{stats.estadisticas.aulas_disponibles}</dd>
                        </div>
                    </dl>
                </div>

                {/* Materias con más profesores */}
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Materias con Profesores Asignados</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Materia
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Código
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Horas Semanales
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profesores
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {stats.materias_mas_profesores.map((materia) => (
                                    <tr key={materia.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{materia.nombre}</div>
                                            <div className="text-sm text-gray-500">{materia.descripcion}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{materia.codigo}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{materia.horas_semanales}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{materia.total_profesores}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
} 