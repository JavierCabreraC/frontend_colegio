"use client";
import { useEffect, useState } from "react";
import { getMisAlumnos } from "@/lib/services";
import { MisAlumno, PaginatedResponse } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function MisAlumnosPage() {
    const [data, setData] = useState<PaginatedResponse<MisAlumno> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMisAlumnos();
                setData(response);
            } catch (err) {
                setError("Error al cargar los alumnos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!data) return null;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Mis Alumnos</h2>
            </div>

            <div className="bg-white rounded-lg shadow">
                <DataTable
                    columns={columns}
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