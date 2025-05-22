export type UserRole = "director" | "profesor" | "alumno";

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

export interface Profesor extends User {
    rol: "profesor";
    materias: string[];
}

export interface Materia {
    id: string;
    nombre: string;
    profesorId: string;
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
