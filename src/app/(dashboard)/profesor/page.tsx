"use client";
import { useProfesorSection } from "../context/profesor-section-context";

export default function ProfesorDashboard() {
    const { selectedSection } = useProfesorSection();

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                    Bienvenido, Profesor
                </h2>
                <p className="text-gray-600">
                    Aquí podrás gestionar tus materias, calificaciones y asistencia.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tarjeta de Materias */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Mis Materias</h3>
                    <p className="text-gray-600">Gestiona tus materias asignadas</p>
                </div>

                {/* Tarjeta de Grupos */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Mis Grupos</h3>
                    <p className="text-gray-600">Administra tus grupos de estudiantes</p>
                </div>

                {/* Tarjeta de Evaluaciones */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Evaluaciones</h3>
                    <p className="text-gray-600">Gestiona tareas y exámenes</p>
                </div>

                {/* Tarjeta de Horarios */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Horarios</h3>
                    <p className="text-gray-600">Consulta tu horario de clases</p>
                </div>

                {/* Tarjeta de Predicciones */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Predicciones</h3>
                    <p className="text-gray-600">Análisis del desempeño de tus alumnos</p>
                </div>

                {/* Tarjeta de Alertas */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Alertas</h3>
                    <p className="text-gray-600">Notificaciones importantes</p>
                </div>
            </div>
        </div>
    );
}
