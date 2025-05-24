"use client";
import { useState, useEffect } from "react";
import { Profesor, ProfesorFormData } from "@/types";



interface ProfesorFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProfesorFormData) => Promise<void>;
    profesor?: Profesor | null;
    isSubmitting: boolean;
}

export function ProfesorFormModal({ 
    isOpen, 
    onClose, 
    onSubmit, 
    profesor,
    isSubmitting 
}: ProfesorFormModalProps) {
    const [formData, setFormData] = useState<ProfesorFormData>({
        usuario: {
            email: "",
            // password: "",
        },
        nombres: "",
        apellidos: "",
        cedula_identidad: "",
        fecha_nacimiento: "",
        genero: "M",
        telefono: "",
        direccion: "",
        especialidad: "",
        fecha_contratacion: new Date().toISOString().split('T')[0],
    });

    // Cuando se abre el modal en modo edición, cargar los datos del profesor
    useEffect(() => {
        if (profesor) {
            setFormData({
                usuario: {
                    email: profesor.email,
                    // password: "", // No se muestra la contraseña actual
                },
                nombres: profesor.nombres || "",
                apellidos: profesor.apellidos || "",
                cedula_identidad: profesor.cedula_identidad,
                fecha_nacimiento: profesor.fecha_nacimiento || "",
                genero: profesor.genero || "M",
                telefono: profesor.telefono || "",
                direccion: profesor.direccion || "",
                especialidad: profesor.especialidad || "",
                fecha_contratacion: profesor.fecha_contratacion,
            });
        } else {
            // Resetear el formulario para nuevo profesor
            setFormData({
                usuario: {
                    email: "",
                    password: "",
                },
                nombres: "",
                apellidos: "",
                cedula_identidad: "",
                fecha_nacimiento: "",
                genero: "M",
                telefono: "",
                direccion: "",
                especialidad: "",
                fecha_contratacion: new Date().toISOString().split('T')[0],
            });
        }
    }, [profesor]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profesor) {
        // Para actualización, estructura específica sin password
        const updateData = {
            usuario: {
                email: formData.usuario.email,
                activo: true
            },
            nombres: formData.nombres,
            apellidos: formData.apellidos,
            cedula_identidad: formData.cedula_identidad,
            fecha_nacimiento: formData.fecha_nacimiento,
            genero: formData.genero,
            telefono: formData.telefono,
            direccion: formData.direccion,
            especialidad: formData.especialidad,
            fecha_contratacion: formData.fecha_contratacion
        };
        await onSubmit(updateData as any);
    } else {
        // Para creación, incluir password
        await onSubmit(formData);
    }
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
                <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {profesor ? "Editar Profesor" : "Nuevo Profesor"}
                        </h3>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Información de usuario */}
                        <div className="space-y-4 border-b border-gray-200 pb-4">
                            <h4 className="font-medium text-gray-900">Información de Usuario</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.usuario.email}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            usuario: { ...formData.usuario, email: e.target.value }
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    />
                                </div>
                                
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contraseña {profesor ? "(dejar vacío para mantener)" : "*"}
                                    </label>
                                    <input
                                        type="password"
                                        required={!profesor}
                                        minLength={8}
                                        value={formData.usuario.password}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            usuario: { ...formData.usuario, password: e.target.value }
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder={profesor ? "••••••••" : ""}
                                    />
                                </div> */}
                            </div>
                        </div>

                        {/* Información personal */}
                        <div className="space-y-4 border-b border-gray-200 pb-4">
                            <h4 className="font-medium text-gray-900">Información Personal</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombres *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={100}
                                        value={formData.nombres}
                                        onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Apellidos *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={100}
                                        value={formData.apellidos}
                                        onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Cédula de Identidad *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={20}
                                        value={formData.cedula_identidad}
                                        onChange={(e) => setFormData({ ...formData, cedula_identidad: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha de Nacimiento *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.fecha_nacimiento}
                                        onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Género *
                                    </label>
                                    <select
                                        required
                                        value={formData.genero}
                                        onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    >
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={20}
                                        value={formData.telefono || ""}
                                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    maxLength={60}
                                    value={formData.direccion || ""}
                                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                            </div>
                        </div>

                        {/* Información profesional */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">Información Profesional</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Especialidad
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={20}
                                        value={formData.especialidad || ""}
                                        onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha de Contratación *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.fecha_contratacion}
                                        onChange={(e) => setFormData({ ...formData, fecha_contratacion: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    />
                                </div>
                            </div>
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
                                {isSubmitting ? "Guardando..." : (profesor ? "Actualizar" : "Crear")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
