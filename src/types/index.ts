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
    usuario: Usuario;
    email: string;
    nombre_completo: string;
    nombres: string;
    apellidos: string;
    cedula_identidad: string;
    fecha_nacimiento: string;
    edad: number;
    genero: string;
    telefono?: string;
    direccion?: string;
    especialidad?: string;
    fecha_contratacion: string;
    activo: boolean;
}

export interface ProfesorFormData {
    usuario: {
        email: string;
        password: string;
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
    descripcion: string;
    horas_semanales: number;
    total_profesores: number;
    profesores_asignados: any[];
}

export interface MateriaFormData {
    codigo: string;
    nombre: string;
    descripcion: string;
    horas_semanales: number;
}

export interface PaginatedResponse<T> {
    count: number;
    total_pages: number;
    current_page: number;
    next: boolean;
    previous: boolean;
    results: T[];
}

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
