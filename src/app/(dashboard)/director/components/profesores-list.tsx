"use client";
import { useEffect, useState } from "react";
import { Profesor, ProfesorFormData } from "@/types";
import { getProfesores, createProfesor, updateProfesor, getProfesor } from "@/lib/services";
import { ProfesorFormModal } from "@/app/(dashboard)/director/components/profesor-form-modal";


export function ProfesoresList() {
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProfesor, setEditingProfesor] = useState<Profesor | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadProfesores();
    }, []);

    async function loadProfesores() {
        try {
            setLoading(true);
            const response = await getProfesores();
            setProfesores(response.results);
            setError("");
        } catch (err) {
            setError("Error al cargar los profesores");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(data: ProfesorFormData) {
        try {
            setIsSubmitting(true);
            await createProfesor(data);
            await loadProfesores();
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
                setError("Error al crear el profesor");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleUpdate(data: ProfesorFormData) {
        if (!editingProfesor) return;
        
        try {
            setIsSubmitting(true);
            await updateProfesor(editingProfesor.usuario, data);
            await loadProfesores();
            setIsModalOpen(false);
            setEditingProfesor(null);
            setError("");
        } catch (err: any) {
            if (err.response?.data) {
                const errors = err.response.data;
                const errorMessages = Object.entries(errors)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join(", ");
                setError(errorMessages);
            } else {
                setError("Error al actualizar el profesor");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleEdit(usuarioId: number) {
    try {
        const profesorDetalle = await getProfesor(usuarioId);
        // Crear objeto profesor con los datos completos
        const profesor: any = {
            usuario: usuarioId,
            email: profesorDetalle.usuario.email || profesorDetalle.email,
            nombre_completo: profesorDetalle.nombre_completo,
            nombres: profesorDetalle.nombres,
            apellidos: profesorDetalle.apellidos,
            cedula_identidad: profesorDetalle.cedula_identidad,
            fecha_nacimiento: profesorDetalle.fecha_nacimiento,
            genero: profesorDetalle.genero,
            telefono: profesorDetalle.telefono,
            direccion: profesorDetalle.direccion,
            especialidad: profesorDetalle.especialidad,
            fecha_contratacion: profesorDetalle.fecha_contratacion,
            activo: profesorDetalle.activo
        };
        setEditingProfesor(profesor);
        setIsModalOpen(true);
    } catch (err) {
        setError("Error al cargar los datos del profesor");
    }
}

    function handleCloseModal() {
        setIsModalOpen(false);
        setEditingProfesor(null);
        setError("");
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Cargando profesores...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Gestión de Profesores</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Nuevo Profesor
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
                                Nombre Completo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cédula
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Especialidad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {profesores.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                    No hay profesores registrados
                                </td>
                            </tr>
                        ) : (
                            profesores.map((profesor) => (
                                <tr key={profesor.usuario}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {profesor.nombre_completo}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{profesor.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{profesor.cedula_identidad}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{profesor.especialidad || "-"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                profesor.activo
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {profesor.activo ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(profesor.usuario)}
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
            <ProfesorFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={editingProfesor ? handleUpdate : handleCreate}
                profesor={editingProfesor}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
