"use client";
import { createContext, useContext } from "react";

export type DashboardSection = 
    | "profesores" 
    | "asignacion" 
    | "materias" 
    | "horarios" 
    | "aulas" 
    | "niveles"
    | "gestiones"
    | "trimestres"
    | "matriculaciones"
    | "periodos" 
    | "bitacora" 
    | "reportes";

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
