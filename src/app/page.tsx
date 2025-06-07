import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";


export const metadata: Metadata = {
    title: "Inicio | Sistema de Gestión Académica",
    description: "Bienvenido al sistema de gestión académica",
};

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header moderno */}
                <header className="text-center mb-20">
                    <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 mb-8">
                        <span className="text-purple-300 text-sm font-medium">🚀 Plataforma Educativa del Futuro</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
                        Sistema de
                        <br />
                        <span className="text-5xl md:text-6xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                            Gestión Académica
                        </span>
                    </h1>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                        Revoluciona la experiencia educativa con inteligencia artificial,
                        <br className="hidden md:block" />
                        análisis predictivo y gestión integral de última generación
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
                    {/* Sección de características */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Potencia tu
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                    {" "}Institución
                                </span>
                            </h2>
                            <p className="text-gray-300 text-lg">
                                Descubre las herramientas que transformarán tu gestión educativa
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                {
                                    icon: "📊",
                                    title: "Analytics Avanzado",
                                    description: "Dashboards interactivos con métricas en tiempo real y visualizaciones predictivas",
                                    gradient: "from-purple-500 to-pink-500"
                                },
                                {
                                    icon: "🎯",
                                    title: "IA Predictiva",
                                    description: "Algoritmos de machine learning para identificar patrones y prevenir deserción estudiantil",
                                    gradient: "from-blue-500 to-cyan-500"
                                },
                                {
                                    icon: "⚡",
                                    title: "Automatización Inteligente",
                                    description: "Procesos automatizados para calificaciones, asistencia y comunicación con padres",
                                    gradient: "from-green-500 to-emerald-500"
                                },
                                {
                                    icon: "🌐",
                                    title: "Colaboración Global",
                                    description: "Plataforma unificada para estudiantes, docentes, padres y administradores",
                                    gradient: "from-orange-500 to-red-500"
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-purple-200 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                                </div>
                            ))}
                        </div>

                        {/* Stats section */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            {[
                                { number: "500+", label: "Instituciones" },
                                { number: "50K+", label: "Estudiantes" },
                                { number: "99.9%", label: "Uptime" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel de login */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>
                        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                            <div className="text-center mb-8">
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    Bienvenido de vuelta
                                </h3>
                                <p className="text-gray-300">
                                    Accede a tu panel de control
                                </p>
                            </div>
                            <LoginForm />

                            {/* Enlaces adicionales */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="flex justify-center space-x-6 text-sm">
                                    <button className="text-purple-300 hover:text-purple-200 transition-colors">
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                    <span className="text-gray-500">|</span>
                                    <button className="text-blue-300 hover:text-blue-200 transition-colors">
                                        Solicitar demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer moderno */}
                <footer className="mt-24 pt-12 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <span className="text-white font-semibold">EduSystem</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © 2024 Sistema de Gestión Académica. Innovando la educación del futuro.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}