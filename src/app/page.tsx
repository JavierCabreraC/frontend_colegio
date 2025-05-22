import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";



export const metadata: Metadata = {
    title: "Inicio | Sistema de Gestión Académica",
    description: "Bienvenido al sistema de gestión académica",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Sistema de Gestión Académica
          </h1>
          <p className="text-gray-600 text-lg">
            Plataforma integral para la gestión educativa
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-800">
              Bienvenido a nuestra plataforma
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Accede a tu cuenta para gestionar:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Calificaciones y rendimiento académico</li>
                <li>Asistencia y participación</li>
                <li>Materias y cursos</li>
                <li>Predicciones de desempeño</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-6 text-center">
              Iniciar Sesión
            </h3>
            <LoginForm />
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2024 Sistema de Gestión Académica. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
