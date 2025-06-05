import * as XLSX from 'xlsx';
import { EstadisticasAcademicas, BitacoraEntry } from '@/types';

export function generateReportesExcel(stats: EstadisticasAcademicas) {
    // Crear un nuevo libro de Excel
    const wb = XLSX.utils.book_new();
    
    // Hoja de Estadísticas Generales
    const statsData = [
        ['Indicador', 'Valor'],
        ['Total Materias', stats.estadisticas.total_materias],
        ['Total Aulas', stats.estadisticas.total_aulas],
        ['Total Niveles', stats.estadisticas.total_niveles],
        ['Total Grupos', stats.estadisticas.total_grupos],
        ['Materias sin Profesor', stats.estadisticas.materias_sin_profesor],
        ['Aulas Disponibles', stats.estadisticas.aulas_disponibles]
    ];
    
    const wsStats = XLSX.utils.aoa_to_sheet(statsData);
    XLSX.utils.book_append_sheet(wb, wsStats, 'Estadísticas Generales');
    
    // Hoja de Materias con Profesores
    const materiasData = [
        ['Materia', 'Código', 'Horas Semanales', 'Profesores'],
        ...stats.materias_mas_profesores.map(materia => [
            materia.nombre,
            materia.codigo,
            materia.horas_semanales,
            materia.total_profesores
        ])
    ];
    
    const wsMaterias = XLSX.utils.aoa_to_sheet(materiasData);
    XLSX.utils.book_append_sheet(wb, wsMaterias, 'Materias con Profesores');
    
    // Guardar el archivo
    XLSX.writeFile(wb, 'reportes-institucionales.xlsx');
}

export function generateBitacoraExcel(entries: BitacoraEntry[]) {
    // Crear un nuevo libro de Excel
    const wb = XLSX.utils.book_new();
    
    // Preparar los datos
    const bitacoraData = [
        ['Usuario', 'Email', 'Acción', 'IP', 'Fecha y Hora'],
        ...entries.map(entry => [
            entry.usuario_nombre,
            entry.usuario_email,
            entry.tipo_accion,
            entry.ip,
            new Date(entry.fecha_hora).toLocaleString()
        ])
    ];
    
    // Crear la hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet(bitacoraData);
    
    // Añadir la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Bitácora');
    
    // Guardar el archivo
    XLSX.writeFile(wb, 'bitacora-sistema.xlsx');
}