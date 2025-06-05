"use client";
import { createContext, useContext } from "react";

export type DashboardSection = 
    | "profesores" 
    | "alumnos" 
    | "materias" 
    | "horarios" 
    | "aulas" 
    | "niveles"
    | "gestiones"
    | "periodos" 
    | "bitacora" 
    | "reportes" 
    | "predicciones";

export interface DashboardSectionContextProps {
    selectedSection: DashboardSection;
    setSelectedSection: (section: DashboardSection) => void;
}

export const DashboardSectionContext = createContext<DashboardSectionContextProps | undefined>(undefined);

export function useDashboardSection() {
    const ctx = useContext(DashboardSectionContext);
    if (!ctx) throw new Error("useDashboardSection debe usarse dentro de DashboardSectionContext");
    return ctx;
}
