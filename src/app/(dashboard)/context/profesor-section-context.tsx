"use client";
import { createContext, useContext } from "react";

export type ProfesorSection = 
    | "mis-materias"
    | "mis-grupos"
    | "mis-alumnos"
    | "mis-horarios"
    | "tareas"
    | "examenes"
    | "pendientes"
    | "predicciones-alumnos"
    | "alertas";

export interface ProfesorSectionContextProps {
    selectedSection: ProfesorSection;
    setSelectedSection: (section: ProfesorSection) => void;
}

export const ProfesorSectionContext = createContext<ProfesorSectionContextProps | undefined>(undefined);

export function useProfesorSection() {
    const ctx = useContext(ProfesorSectionContext);
    if (!ctx) throw new Error("useProfesorSection debe usarse dentro de ProfesorSectionContext");
    return ctx;
} 