"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MisGrupo } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<MisGrupo>[] = [
    {
        accessorKey: "nombre_completo",
        header: "Nombre del Grupo",
    },
    {
        accessorKey: "materia_nombre",
        header: "Materia",
    },
    {
        accessorKey: "total_alumnos",
        header: "Total Alumnos",
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