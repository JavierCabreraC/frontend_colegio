"use client";
import { useEffect, useState } from "react";
import { getPrediccionesAlumnos } from "@/lib/services";

interface PrediccionAlumno {
    alumno_id: number;
    matricula: string;
    nombre_completo: string;
    grupo_nombre: string;
    total_materias: number;
    promedio_predicciones: number;
    nivel_riesgo_general: "alto" | "medio" | "bajo";
    materias_riesgo_alto: number;
    ultima_actualizacion: string;
}

interface PrediccionesResponse {
    total_alumnos: number;
    estadisticas: {
        alto_riesgo: number;
        medio_riesgo: number;
        bajo_riesgo: number;
    };
    alumnos: PrediccionAlumno[];
}

export default function PrediccionesAlumnosPage() {
    const [data, setData] = useState<PrediccionesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPrediccionesAlumnos();
                setData(response);
            } catch (err) {
                setError("Error al cargar las predicciones de alumnos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Cargando predicciones...</div>
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

    if (!data) return null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Predicciones de Alumnos</h1>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total de Alumnos</h3>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{data.total_alumnos}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Alto Riesgo</h3>
                    <p className="mt-1 text-2xl font-semibold text-red-600">{data.estadisticas.alto_riesgo}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Medio Riesgo</h3>
                    <p className="mt-1 text-2xl font-semibold text-yellow-600">{data.estadisticas.medio_riesgo}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Bajo Riesgo</h3>
                    <p className="mt-1 text-2xl font-semibold text-green-600">{data.estadisticas.bajo_riesgo}</p>
                </div>
            </div>

            {/* Tabla de Alumnos */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Matrícula
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre Completo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Grupo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Promedio Predicción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nivel de Riesgo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Materias en Riesgo
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.alumnos.map((alumno) => (
                            <tr key={alumno.alumno_id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {alumno.matricula}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{alumno.nombre_completo}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{alumno.grupo_nombre}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {alumno.promedio_predicciones.toFixed(2)}%
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${alumno.nivel_riesgo_general === 'alto' ? 'bg-red-100 text-red-800' :
                                        alumno.nivel_riesgo_general === 'medio' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'}`}>
                                        {alumno.nivel_riesgo_general.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {alumno.materias_riesgo_alto} de {alumno.total_materias}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 