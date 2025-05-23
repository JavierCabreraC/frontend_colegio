"use client";
import { useState, useEffect } from "react";
import { Materia, MateriaFormData } from "@/types";


interface MateriaFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: MateriaFormData) => Promise<void>;
    materia?: Materia | null;
    isSubmitting: boolean;
}

export function MateriaFormModal({ 
    isOpen, 
    onClose, 
    onSubmit, 
    materia,
    isSubmitting 
}: MateriaFormModalProps) {
    const [formData, setFormData] = useState<MateriaFormData>({
        codigo: "",
        nombre: "",
        descripcion: "",
        horas_semanales: 1,
    });

    // Cuando se abre el modal en modo edición, cargar los datos de la materia
    useEffect(() => {
        if (materia) {
            setFormData({
                codigo: materia.codigo,
                nombre: materia.nombre,
                descripcion: materia.descripcion || "",
                horas_semanales: materia.horas_semanales,
            });
        } else {
            // Resetear el formulario para nueva materia
            setFormData({
                codigo: "",
                nombre: "",
                descripcion: "",
                horas_semanales: 1,
            });
        }
    }, [materia]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Overlay oscuro */}
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />
                
                {/* Modal */}
                <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
                    {/* Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {materia ? "Editar Materia" : "Nueva Materia"}
                        </h3>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Código *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.codigo}
                                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ej: MAT101"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ej: Matemáticas I"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descripción
                            </label>
                            <textarea
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Descripción de la materia..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Horas Semanales *
                            </label>
                            <input
                                type="number"
                                required
                                min="1"
                                max="20"
                                value={formData.horas_semanales}
                                onChange={(e) => setFormData({ ...formData, horas_semanales: parseInt(e.target.value) || 1 })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting ? "Guardando..." : (materia ? "Actualizar" : "Crear")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
