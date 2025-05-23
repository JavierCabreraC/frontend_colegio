"use client";
import { useEffect, useState } from "react";
import { Materia, MateriaFormData } from "@/types";
import { getMaterias, createMateria, updateMateria, getMateria } from "@/lib/services";
import { MateriaFormModal } from "@/app/(dashboard)/director/components/materia-form-modal";


export function MateriasList() {
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMateria, setEditingMateria] = useState<Materia | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadMaterias();
    }, []);

    async function loadMaterias() {
        try {
            setLoading(true);
            const response = await getMaterias();
            setMaterias(response.results);
            setError("");
        } catch (err) {
            setError("Error al cargar las materias");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(data: MateriaFormData) {
        try {
            setIsSubmitting(true);
            await createMateria(data);
            await loadMaterias();
            setIsModalOpen(false);
            setError("");
        } catch (err: any) {
            if (err.response?.data) {
                const errors = err.response.data;
                const errorMessages = Object.entries(errors)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join(", ");
                setError(errorMessages);
            } else {
                setError("Error al crear la materia");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleUpdate(data: MateriaFormData) {
        if (!editingMateria) return;
        
        try {
            setIsSubmitting(true);
            await updateMateria(editingMateria.id, data);
            await loadMaterias();
            setIsModalOpen(false);
            setEditingMateria(null);
            setError("");
        } catch (err: any) {
            if (err.response?.data) {
                const errors = err.response.data;
                const errorMessages = Object.entries(errors)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join(", ");
                setError(errorMessages);
            } else {
                setError("Error al actualizar la materia");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleEdit(materiaId: number) {
        try {
            const materia = await getMateria(materiaId);
            setEditingMateria(materia);
            setIsModalOpen(true);
        } catch (err) {
            setError("Error al cargar los datos de la materia");
        }
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setEditingMateria(null);
        setError("");
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Cargando materias...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Gestión de Materias</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Nueva Materia
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    {error}
                </div>
            )}

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Código
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Horas Semanales
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Profesores Asignados
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {materias.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                    No hay materias registradas
                                </td>
                            </tr>
                        ) : (
                            materias.map((materia) => (
                                <tr key={materia.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {materia.codigo}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{materia.nombre}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">
                                            {materia.descripcion || "-"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{materia.horas_semanales} hrs</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{materia.total_profesores}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(materia.id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de formulario */}
            <MateriaFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={editingMateria ? handleUpdate : handleCreate}
                materia={editingMateria}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
