"use client";
import { MateriasList } from "./components/materias-list";
import { ProfesoresList } from "./components/profesores-list";
import { BitacoraList } from "./components/bitacora-list";
import { BitacoraStats } from "./components/bitacora-stats";
import { useDashboardSection } from "@/app/(dashboard)/context/dashboard-section-context";
import { AulasList } from "./components/aulas-list";
import { NivelesList } from "./components/niveles-list";
import { GestionesList } from "./components/gestiones-list";
import { HorariosList } from "./components/horarios-list";
import { TrimestresList } from "./components/trimestres-list";
import { MatriculacionesList } from "./components/matriculaciones-list";
import { AsignacionList } from "./components/asignacion-list";
import { ReportesList } from "./components/reportes-list";

export default function DirectorDashboard() {
    const { selectedSection } = useDashboardSection();

    const renderContent = () => {
        switch (selectedSection) {
            case "profesores":
                return <ProfesoresList />;
            case "materias":
                return <MateriasList />;
            case "aulas":
                return <AulasList />;
            case "niveles":
                return <NivelesList />;
            case "gestiones":
                return <GestionesList />;
            case "horarios":
                return <HorariosList />;
            case "trimestres":
                return <TrimestresList />;
            case "matriculaciones":
                return <MatriculacionesList />;
            case "asignacion":
                return <AsignacionList />;
            case "bitacora":
                return (
                    <div className="space-y-6">
                        <BitacoraStats />
                        <BitacoraList />
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
                return <ReportesList />;
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
