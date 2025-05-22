export const GRUPOS = ["A", "B"] as const;
export const TRIMESTRES = [1, 2, 3] as const;
export const CURSOS = ["1", "2", "3", "4", "5", "6"] as const;



export const ROLES = {
    DIRECTOR: "director",
    PROFESOR: "profesor",
    ALUMNO: "alumno",
} as const;

export const RUTAS = {
    LOGIN: "/login",
    DASHBOARD: {
        DIRECTOR: "/director",
        PROFESOR: "/profesor",
        ALUMNO: "/alumno",
    },
} as const;

export const MAX_ALUMNOS_POR_GRUPO = 40;
