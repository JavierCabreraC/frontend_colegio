export type UserRole = "director" | "profesor" | "alumno";

export interface Usuario {
    id: number;
    email: string;
    tipo_usuario: UserRole;
    activo: boolean;
    is_staff: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Profesor {
    usuario: number; // ID del usuario, no el objeto completo en la lista
    email: string;
    nombre_completo: string;
    nombres?: string; // Solo viene en el detalle
    apellidos?: string; // Solo viene en el detalle
    cedula_identidad: string;
    fecha_nacimiento?: string; // Solo viene en el detalle
    edad?: number; // Solo viene en el detalle
    genero?: string; // Solo viene en el detalle
    telefono?: string;
    direccion?: string; // Solo viene en el detalle
    especialidad?: string;
    fecha_contratacion: string;
    activo: boolean;
    created_at?: string; // Solo viene en el detalle
    updated_at?: string; // Solo viene en el detalle
}

// Tipo específico para cuando se obtiene el detalle de un profesor
export interface ProfesorDetalle extends Omit<Profesor, "usuario"> {
    usuario: Usuario; // En el detalle viene el objeto completo
    nombres: string;
    apellidos: string;
    fecha_nacimiento: string;
    edad: number;
    genero: string;
    direccion?: string;
    created_at: string;
    updated_at: string;
}

export interface ProfesorFormData {
    usuario: {
        email: string;
        password?: string; // Opcional para edición
    };
    nombres: string;
    apellidos: string;
    cedula_identidad: string;
    fecha_nacimiento: string;
    genero: string;
    telefono?: string;
    direccion?: string;
    especialidad?: string;
    fecha_contratacion: string;
}

export interface Materia {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string; // Solo viene en el detalle
    horas_semanales: number;
    total_profesores: number;
    profesores_asignados?: any[]; // Solo viene en el detalle
    created_at?: string; // Solo viene en el detalle
    updated_at?: string; // Solo viene en el detalle
}

export interface MateriaFormData {
    codigo: string;
    nombre: string;
    descripcion: string;
    horas_semanales: number;
}

export interface Aula {
    id: number;
    nombre: string;
    capacidad: number;
    horarios_count: number;
}

export interface Nivel {
    id: number;
    numero: number;
    nombre: string;
    descripcion: string;
    total_grupos: number;
    total_alumnos: number;
}

export interface Gestion {
    id: number;
    anio: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    activa: boolean;
    total_trimestres: number;
    total_matriculaciones: number;
}

export interface Horario {
    id: number;
    profesor_materia: number;
    grupo: number;
    aula: number;
    trimestre: number;
    profesor_nombre: string;
    profesor_apellidos: string;
    materia_nombre: string;
    materia_codigo: string;
    grupo_nombre: string;
    aula_nombre: string;
    trimestre_nombre: string;
    dia_semana: number;
    dia_semana_nombre: string;
    hora_inicio: string;
    hora_fin: string;
}

export interface Trimestre {
    id: number;
    gestion: number;
    gestion_nombre: string;
    gestion_anio: number;
    numero: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
}

export interface Matriculacion {
    id: number;
    alumno: number;
    gestion: number;
    alumno_nombre: string;
    alumno_apellidos: string;
    alumno_matricula: string;
    gestion_nombre: string;
    gestion_anio: number;
    fecha_matriculacion: string;
    activa: boolean;
    observaciones: string;
}

export interface PaginatedResponse<T> {
    count: number;
    total_pages: number;
    current_page: number;
    next: boolean;
    previous: boolean;
    results: T[];
}

// Tipos existentes para futura implementación
export interface User {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    rol: UserRole;
}

export interface Alumno extends User {
    rol: "alumno";
    curso: string;
    grupo: "A" | "B";
}

export interface Calificacion {
    id: string;
    alumnoId: string;
    materiaId: string;
    trimestre: 1 | 2 | 3;
    nota: number;
    fecha: Date;
}

export interface Asistencia {
    id: string;
    alumnoId: string;
    materiaId: string;
    fecha: Date;
    presente: boolean;
}

export interface Participacion {
    id: string;
    alumnoId: string;
    materiaId: string;
    fecha: Date;
    puntaje: number;
    descripcion: string;
}

export interface BitacoraEntry {
    id: number;
    usuario: number;
    usuario_email: string;
    usuario_nombre: string;
    tipo_accion: string;
    ip: string;
    fecha_hora: string;
    created_at: string;
}

export interface BitacoraStats {
    total_acciones: number;
    acciones_por_tipo: {
        tipo_accion: string;
        count: number;
    }[];
    acciones_ultimos_7_dias: number;
    usuarios_mas_activos: {
        usuario__email: string;
        usuario__tipo_usuario: string;
        count: number;
    }[];
}
