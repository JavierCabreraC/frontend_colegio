"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MisHorario } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<MisHorario>[] = [
    {
        accessorKey: "materia_nombre",
        header: "Materia",
    },
    {
        accessorKey: "grupo_nombre",
        header: "Grupo",
    },
    {
        accessorKey: "aula_nombre",
        header: "Aula",
    },
    {
        accessorKey: "dia_semana_nombre",
        header: "Día",
    },
    {
        accessorKey: "hora_inicio",
        header: "Hora Inicio",
        cell: ({ row }) => {
            const hora = row.getValue("hora_inicio") as string;
            return hora.substring(0, 5); // Formato HH:mm
        },
    },
    {
        accessorKey: "hora_fin",
        header: "Hora Fin",
        cell: ({ row }) => {
            const hora = row.getValue("hora_fin") as string;
            return hora.substring(0, 5); // Formato HH:mm
        },
    },
    {
        accessorKey: "trimestre_nombre",
        header: "Trimestre",
    },
    {
        accessorKey: "gestion_anio",
        header: "Gestión",
    },
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.getValue("estado") as string;
            return (
                <Badge variant={estado === "activo" ? "success" : "destructive"}>
                    {estado}
                </Badge>
            );
        },
    },
]; 