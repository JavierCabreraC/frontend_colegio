import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
    title: "Inicio | Sistema de Gestión Académica",
    description: "Bienvenido al sistema de gestión académica",
};

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-6">
                        Sistema de Gestión Académica
                    </h1>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                        Plataforma integral para la gestión educativa del siglo XXI
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-semibold text-blue-800">
                            Transformando la Educación
                        </h2>
                        <div className="space-y-6 text-gray-600">
                            <p className="text-lg">
                                Accede a tu cuenta para gestionar:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    {
                                        title: "Calificaciones y Rendimiento",
                                        description: "Seguimiento detallado del progreso académico"
                                    },
                                    {
                                        title: "Asistencia y Participación",
                                        description: "Control y análisis de la participación estudiantil"
                                    },
                                    {
                                        title: "Materias y Cursos",
                                        description: "Gestión eficiente del plan de estudios"
                                    },
                                    {
                                        title: "Predicciones de Desempeño",
                                        description: "Análisis predictivo para mejorar resultados"
                                    }
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 text-sm">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                        <h3 className="text-2xl font-semibold text-blue-900 mb-8 text-center">
                            Iniciar Sesión
                        </h3>
                        <LoginForm />
                    </div>
                </div>

                <footer className="mt-20 text-center">
                    <p className="text-gray-500 text-sm">
                        © 2024 Sistema de Gestión Académica. Todos los derechos reservados.
                    </p>
                </footer>
            </div>
        </div>
    );
}
