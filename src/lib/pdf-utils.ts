import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EstadisticasAcademicas, BitacoraEntry } from '@/types';


export function generateReportesPDF(stats: EstadisticasAcademicas) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Título
    doc.setFontSize(20);
    doc.text('Reportes Institucionales', pageWidth / 2, 20, { align: 'center' });
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });
    
    // Estadísticas Generales
    doc.setFontSize(16);
    doc.text('Resumen General', 14, 45);
    
    const statsData = [
        ['Total Materias', stats.estadisticas.total_materias.toString()],
        ['Total Aulas', stats.estadisticas.total_aulas.toString()],
        ['Total Niveles', stats.estadisticas.total_niveles.toString()],
        ['Total Grupos', stats.estadisticas.total_grupos.toString()],
        ['Materias sin Profesor', stats.estadisticas.materias_sin_profesor.toString()],
        ['Aulas Disponibles', stats.estadisticas.aulas_disponibles.toString()]
    ];
    
    (doc as any).autoTable({
        startY: 50,
        head: [['Indicador', 'Valor']],
        body: statsData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }
    });
    
    // Materias con Profesores
    doc.setFontSize(16);
    doc.text('Materias con Profesores Asignados', 14, (doc as any).lastAutoTable.finalY + 20);
    
    const materiasData = stats.materias_mas_profesores.map(materia => [
        materia.nombre,
        materia.codigo,
        materia.horas_semanales.toString(),
        materia.total_profesores.toString()
    ]);
    
    (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 25,
        head: [['Materia', 'Código', 'Horas Semanales', 'Profesores']],
        body: materiasData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }
    });
    
    // Guardar el PDF
    doc.save('reportes-institucionales.pdf');
}

export function generateBitacoraPDF(entries: BitacoraEntry[]) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Título
    doc.setFontSize(20);
    doc.text('Bitácora del Sistema', pageWidth / 2, 20, { align: 'center' });
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });
    
    // Tabla de registros
    const bitacoraData = entries.map(entry => [
        entry.usuario_nombre,
        entry.usuario_email,
        entry.tipo_accion,
        entry.ip,
        new Date(entry.fecha_hora).toLocaleString()
    ]);
    
    (doc as any).autoTable({
        startY: 40,
        head: [['Usuario', 'Email', 'Acción', 'IP', 'Fecha y Hora']],
        body: bitacoraData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }
    });
    
    // Guardar el PDF
    doc.save('bitacora-sistema.pdf');
}