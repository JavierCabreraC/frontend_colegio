"use client";
import { useProfesorSection } from "../../context/profesor-section-context";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    Users,
    GraduationCap,
    Clock,
    ClipboardList,
    FileText,
    AlertCircle,
    LineChart,
    Bell
} from "lucide-react";

interface SidebarMenuProps {
    isCollapsed: boolean;
}

export function SidebarMenu({ isCollapsed }: SidebarMenuProps) {
    const { selectedSection, setSelectedSection } = useProfesorSection();

    const menuItems = [
        {
            section: "Académico",
            items: [
                { id: "mis-materias", label: "Mis materias", icon: BookOpen },
                { id: "mis-grupos", label: "Mis grupos", icon: Users },
                { id: "mis-alumnos", label: "Mis alumnos", icon: GraduationCap },
                { id: "mis-horarios", label: "Mis horarios", icon: Clock },
            ],
        },
        {
            section: "Evaluaciones",
            items: [
                { id: "tareas", label: "Tareas", icon: ClipboardList },
                { id: "examenes", label: "Exámenes", icon: FileText },
                { id: "pendientes", label: "Pendientes", icon: AlertCircle },
            ],
        },
        {
            section: "Predicciones",
            items: [
                { id: "predicciones-alumnos", label: "Mis alumnos", icon: LineChart },
                { id: "alertas", label: "Alertas", icon: Bell },
            ],
        },
    ];

    return (
        <nav className="space-y-6">
            {menuItems.map((group) => (
                <div key={group.section}>
                    {!isCollapsed && (
                        <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            {group.section}
                        </h3>
                    )}
                    <div className="mt-2 space-y-1">
                        {group.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedSection(item.id as any)}
                                    className={cn(
                                        "w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                        selectedSection === item.id
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-3")} />
                                    {!isCollapsed && <span>{item.label}</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </nav>
    );
} 