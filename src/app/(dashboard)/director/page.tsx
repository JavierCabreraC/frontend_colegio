"use client";
import { MateriasList } from "./components/materias-list";
import { ProfesoresList } from "./components/profesores-list";
import { BitacoraList } from "./components/bitacora-list";
import { BitacoraStats } from "./components/bitacora-stats";
import { useDashboardSection } from "@/app/(dashboard)/context/dashboard-section-context";

export default function DirectorDashboard() {
    const { selectedSection } = useDashboardSection();

    const renderContent = () => {
        switch (selectedSection) {
            case "profesores":
                return <ProfesoresList />;
            case "materias":
                return <MateriasList />;
            case "bitacora":
                return (
                    <div className="space-y-6">
                        <BitacoraStats />
                        <BitacoraList />
                    </div>
                );
            case "alumnos":
                return (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">Sección de Alumnos</p>
                        <p className="text-sm mt-2">En desarrollo...</p>
                    </div>
                );
            case "horarios":
                return (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">Gestión de Horarios</p>
                        <p className="text-sm mt-2">En desarrollo...</p>
                    </div>
                );
            case "aulas":
                return (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">Gestión de Aulas</p>
                        <p className="text-sm mt-2">En desarrollo...</p>
                    </div>
                );
            case "periodos":
                return (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">Períodos Académicos</p>
                        <p className="text-sm mt-2">En desarrollo...</p>
                    </div>
                );
            case "reportes":
                return (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">Reportes Institucionales</p>
                        <p className="text-sm mt-2">En desarrollo...</p>
                    </div>
                );
            case "predicciones":
                return (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">Predicciones ML</p>
                        <p className="text-sm mt-2">En desarrollo...</p>
                    </div>
                );
            default:
                return <div className="text-center text-gray-500">Seleccione una opción del menú</div>;
        }
    };

    return (
        <div className="w-full">
            {renderContent()}
        </div>
    );
}
