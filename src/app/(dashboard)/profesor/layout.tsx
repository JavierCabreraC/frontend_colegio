"use client";
import { useState } from "react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { SidebarMenu } from "./components/sidebar-menu";
import { ProfesorSectionContext, ProfesorSection } from "../context/profesor-section-context";

interface ProfesorLayoutProps {
    children: React.ReactNode;
}

export default function ProfesorLayout({
    children,
}: ProfesorLayoutProps) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedSection, setSelectedSection] = useState<ProfesorSection>("mis-materias");

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                await logout(refreshToken);
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                router.push("/");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <ProfesorSectionContext.Provider value={{ selectedSection, setSelectedSection }}>
            <div className="min-h-screen bg-gray-100">
                {/* Barra superior */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                <span className="ml-4 text-xl font-semibold text-gray-800">Panel del Profesor</span>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-800"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
    
                <div className="flex pt-16">
                    {/* Barra lateral */}
                    <aside className={`fixed left-0 top-16 bottom-0 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-sm transition-all duration-300 z-40 overflow-y-auto`}>
                        <div className="py-4">
                            <SidebarMenu isCollapsed={!isSidebarOpen} />
                        </div>
                    </aside>
    
                    {/* Contenido principal */}
                    <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-4`}>
                        {children}
                    </main>
                </div>
            </div>
        </ProfesorSectionContext.Provider>
    );
} 