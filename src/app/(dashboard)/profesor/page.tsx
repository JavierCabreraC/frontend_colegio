"use client";
import { useEffect, useState } from "react";
import { useProfesorSection } from "../context/profesor-section-context";
import { getMisMaterias, getMisGrupos, getMisAlumnos, getMisHorarios } from "@/lib/services";
import { MisMateria, MisGrupo, MisAlumno, MisHorario, PaginatedResponse } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { columns as materiasColumns } from "./mis-materias/columns";
import { columns as gruposColumns } from "./mis-grupos/columns";
import { columns as alumnosColumns } from "./mis-alumnos/columns";
import { columns as horariosColumns } from "./mis-horarios/columns";

export default function ProfesorDashboard() {
    const { selectedSection } = useProfesorSection();
    const [data, setData] = useState<PaginatedResponse<any> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                let response;
                switch (selectedSection) {
                    case "mis-materias":
                        response = await getMisMaterias();
                        break;
                    case "mis-grupos":
                        response = await getMisGrupos();
                        break;
                    case "mis-alumnos":
                        response = await getMisAlumnos();
                        break;
                    case "mis-horarios":
                        response = await getMisHorarios();
                        break;
                    default:
                        return;
                }

                setData(response);
            } catch (err: any) {
                setError(err.message || "Error al cargar los datos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedSection]);

    if (loading) return <div className="p-6">Cargando...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!data) return null;

    const getColumns = () => {
        switch (selectedSection) {
            case "mis-materias":
                return materiasColumns;
            case "mis-grupos":
                return gruposColumns;
            case "mis-alumnos":
                return alumnosColumns;
            case "mis-horarios":
                return horariosColumns;
            default:
                return [];
        }
    };

    const getTitle = () => {
        switch (selectedSection) {
            case "mis-materias":
                return "Mis Materias";
            case "mis-grupos":
                return "Mis Grupos";
            case "mis-alumnos":
                return "Mis Alumnos";
            case "mis-horarios":
                return "Mis Horarios";
            default:
                return "Dashboard";
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
            </div>

            <div className="bg-white rounded-lg shadow">
                <DataTable
                    columns={getColumns()}
                    data={data.results}
                    pagination={{
                        totalPages: data.total_pages,
                        currentPage: data.current_page,
                        totalItems: data.count,
                    }}
                />
            </div>
        </div>
    );
}
