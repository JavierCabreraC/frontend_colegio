import { ENDPOINTS } from "@/lib/config";
import { fetchWithAuth } from "@/lib/utils";
import { 
    Materia, 
    MateriaFormData, 
    PaginatedResponse, 
    Profesor, 
    ProfesorFormData,
    ProfesorDetalle,
    BitacoraEntry,
    BitacoraStats,
    Aula,
    Nivel,
    Gestion,
    Horario,
    Trimestre,
    Matriculacion,
    ProfesorMateria,
    EstadisticasAcademicas,
    MisMateria,
    MisGrupo,
    MisAlumno,
    MisHorario
} from "@/types";


// Servicios para Profesores
export async function getProfesores(page: number = 1): Promise<PaginatedResponse<Profesor>> {
    const response = await fetchWithAuth(`${ENDPOINTS.AUTH.PROFESORES}?page=${page}`);
    return response.json();
}

export async function getProfesor(id: number): Promise<ProfesorDetalle> {
    const response = await fetchWithAuth(`${ENDPOINTS.AUTH.PROFESORES}${id}/`);
    return response.json();
}

export async function createProfesor(data: ProfesorFormData): Promise<Profesor> {
    const response = await fetchWithAuth(ENDPOINTS.AUTH.PROFESORES, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function updateProfesor(id: number, data: ProfesorFormData): Promise<Profesor> {
    const response = await fetchWithAuth(`${ENDPOINTS.AUTH.PROFESORES}${id}/`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return response.json();
}

// *******************************************************************************************************

// Servicios para Materias
export async function getMaterias(page: number = 1): Promise<PaginatedResponse<Materia>> {
    const response = await fetchWithAuth(`${ENDPOINTS.ACADEMIC.MATERIAS}?page=${page}`);
    return response.json();
}

export async function getMateria(id: number): Promise<Materia> {
    const response = await fetchWithAuth(`${ENDPOINTS.ACADEMIC.MATERIAS}${id}/`);
    return response.json();
}

export async function createMateria(data: MateriaFormData): Promise<Materia> {
    const response = await fetchWithAuth(ENDPOINTS.ACADEMIC.MATERIAS, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function updateMateria(id: number, data: MateriaFormData): Promise<Materia> {
    const response = await fetchWithAuth(`${ENDPOINTS.ACADEMIC.MATERIAS}${id}/`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function getBitacora(): Promise<PaginatedResponse<BitacoraEntry>> {
    const response = await fetchWithAuth(ENDPOINTS.AUTH.BITACORA);
    return response.json();
}

export async function getBitacoraStats(): Promise<BitacoraStats> {
    const response = await fetchWithAuth(ENDPOINTS.AUTH.BITACORA_STATS);
    return response.json();
}

// Servicios para Aulas
export async function getAulas(page: number = 1): Promise<PaginatedResponse<Aula>> {
    const response = await fetchWithAuth(`${ENDPOINTS.ACADEMIC.AULAS}?page=${page}`);
    return response.json();
}

// Servicios para Niveles
export async function getNiveles(): Promise<Nivel[]> {
    const response = await fetchWithAuth(ENDPOINTS.ACADEMIC.NIVELES);
    return response.json();
}

// Servicios para Gestiones
export async function getGestiones(page: number = 1): Promise<PaginatedResponse<Gestion>> {
    const response = await fetchWithAuth(`${ENDPOINTS.ACADEMIC.GESTIONES}?page=${page}`);
    return response.json();
}

// Servicios para Horarios
export async function getHorarios(page: number = 1): Promise<PaginatedResponse<Horario>> {
    const response = await fetchWithAuth(`${ENDPOINTS.ACADEMIC.HORARIOS}?page=${page}`);
    return response.json();
}

// Servicios para Trimestres
export async function getTrimestres(): Promise<Trimestre[]> {
    const response = await fetchWithAuth(ENDPOINTS.ACADEMIC.TRIMESTRES);
    return response.json();
}

// Servicios para Matriculaciones
export async function getMatriculaciones(page: number = 1): Promise<PaginatedResponse<Matriculacion>> {
    const response = await fetchWithAuth(`${ENDPOINTS.ACADEMIC.MATRICULACIONES}?page=${page}`);
    return response.json();
}

// Servicios para Profesor-Materias
export async function getProfesorMaterias(page: number = 1): Promise<PaginatedResponse<ProfesorMateria>> {
    const response = await fetchWithAuth(`${ENDPOINTS.ACADEMIC.PROFESOR_MATERIAS}?page=${page}`);
    return response.json();
}

// Servicios para Estadísticas
export async function getEstadisticasAcademicas(): Promise<EstadisticasAcademicas> {
    const response = await fetchWithAuth(ENDPOINTS.ACADEMIC.STATS);
    return response.json();
}

// Servicios para Profesor - Mis Materias
export async function getMisMaterias(): Promise<PaginatedResponse<MisMateria>> {
    const response = await fetchWithAuth(ENDPOINTS.ACADEMIC.MIS_MATERIAS);
    if (!response.ok) {
        throw new Error("Error al cargar las materias");
    }
    return response.json();
}

// Servicios para Profesor - Mis Grupos
export async function getMisGrupos(): Promise<PaginatedResponse<MisGrupo>> {
    const response = await fetchWithAuth(ENDPOINTS.ACADEMIC.MIS_GRUPOS);
    if (!response.ok) {
        throw new Error("Error al cargar los grupos");
    }
    return response.json();
}

// Servicios para Profesor - Mis Alumnos
export async function getMisAlumnos(): Promise<PaginatedResponse<MisAlumno>> {
    const response = await fetchWithAuth(ENDPOINTS.ACADEMIC.MIS_ALUMNOS);
    if (!response.ok) {
        throw new Error("Error al cargar los alumnos");
    }
    return response.json();
}

// Servicios para Profesor - Mis Horarios
export async function getMisHorarios(): Promise<PaginatedResponse<MisHorario>> {
    const response = await fetchWithAuth(ENDPOINTS.ACADEMIC.MIS_HORARIOS);
    if (!response.ok) {
        throw new Error("Error al cargar los horarios");
    }
    return response.json();
}

export async function getPrediccionesAlumnos() {
    const response = await fetchWithAuth(ENDPOINTS.AUTH.PREDICCIONES_ALUMNOS);
    if (!response.ok) {
        throw new Error('Error al obtener las predicciones de alumnos');
    }
    return response.json();
}
