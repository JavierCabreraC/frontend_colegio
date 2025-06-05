"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MisAlumno } from "@/types";
import { Badge } from "@/components/ui/badge";


export const columns: ColumnDef<MisAlumno>[] = [
    {
        accessorKey: "nombre_completo",
        header: "Nombre Completo",
    },
    {
        accessorKey: "matricula",
        header: "Matrícula",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "grupo_nombre",
        header: "Grupo",
    },
    {
        accessorKey: "telefono",
        header: "Teléfono",
    },
    {
        accessorKey: "edad",
        header: "Edad",
    },
    {
        accessorKey: "materia_nombre",
        header: "Materia",
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