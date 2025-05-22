"use client";

import { useState } from "react";
import { ProfesoresList } from "./components/profesores-list";
import { MateriasList } from "./components/materias-list";
import { DashboardSection, DashboardSectionContext } from "@/app/(dashboard)/context/dashboard-section-context";



export default function DirectorDashboard() {
    const [selectedSection, setSelectedSection] = useState<DashboardSection>("profesores");

    const renderContent = () => {
        switch (selectedSection) {
            case "profesores":
                return <ProfesoresList />;
            case "materias":
                return <MateriasList />;
            // Aquí se añadirán los demás componentes según se implementen
            default:
                return <div className="text-center text-gray-500">Seleccione una opción del menú</div>;
        }
    };

    return (
        <DashboardSectionContext.Provider value={{ selectedSection, setSelectedSection }}>
            <div className="flex flex-col items-center justify-center min-h-full">
                <div className="w-full max-w-4xl">{renderContent()}</div>
            </div>
        </DashboardSectionContext.Provider>
    );
}
