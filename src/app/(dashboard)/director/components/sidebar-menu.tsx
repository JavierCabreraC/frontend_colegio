"use client";

import { cn } from "@/lib/utils";
import { useDashboardSection, DashboardSection } from "../../context/dashboard-section-context";

const menuItems = [
    {
        title: "Gestión de Personal",
        items: [
            { name: "Profesores", section: "profesores" as DashboardSection, icon: "👨‍🏫" },
            { name: "Alumnos", section: "alumnos" as DashboardSection, icon: "👨‍🎓" },
        ]
    },
    {
        title: "Gestión Académica",
        items: [
            { name: "Materias", section: "materias" as DashboardSection, icon: "📚" },
            { name: "Horarios", section: "horarios" as DashboardSection, icon: "⏰" },
            { name: "Aulas", section: "aulas" as DashboardSection, icon: "🏫" },
        ]
    },
    {
        title: "Configuración",
        items: [
            { name: "Períodos Académicos", section: "periodos" as DashboardSection, icon: "📅" },
            { name: "Bitácora del Sistema", section: "bitacora" as DashboardSection, icon: "📝" },
        ]
    },
    {
        title: "Reportes",
        items: [
            { name: "Reportes Institucionales", section: "reportes" as DashboardSection, icon: "📊" },
            { name: "Predicciones ML", section: "predicciones" as DashboardSection, icon: "🤖" },
        ]
    }
];

export function SidebarMenu({ isCollapsed }: { isCollapsed: boolean }) {
    const { selectedSection, setSelectedSection } = useDashboardSection();
    return (
        <div className="space-y-6">
            {menuItems.map((section) => (
                <div key={section.title}>
                    {!isCollapsed && (
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {section.title}
                        </h3>
                    )}
                    <div className="mt-2 space-y-1">
                        {section.items.map((item) => (
                            <button
                                key={item.section}
                                onClick={() => setSelectedSection(item.section as DashboardSection)}
                                className={cn(
                                    "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md",
                                    selectedSection === item.section
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    isCollapsed && "justify-center px-0"
                                )}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                {!isCollapsed && item.name}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
