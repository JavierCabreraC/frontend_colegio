"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MisMateria } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<MisMateria>[] = [
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "codigo",
        header: "Código",
    },
    {
        accessorKey: "creditos",
        header: "Créditos",
    },
    {
        accessorKey: "horas_teoricas",
        header: "Horas Teóricas",
    },
    {
        accessorKey: "horas_practicas",
        header: "Horas Prácticas",
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
    {
        accessorKey: "created_at",
        header: "Fecha de Creación",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            return format(date, "PPP", { locale: es });
        },
    },
]; 