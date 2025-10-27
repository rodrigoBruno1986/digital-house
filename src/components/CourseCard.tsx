'use client';

import { Course } from '@/types/course';

interface CourseCardProps {
  curso: Course;
  userRole?: string;
  isAuthenticated?: boolean;
  estaInscrito?: (cursoId: string) => boolean;
  onEdit?: (curso: Course) => void;
  onDelete?: (curso: Course) => void;
  onInscribirse?: (cursoId: string) => void;
  onCancelInscription?: (curso: Course) => void;
  variant?: 'cursos' | 'mis-cursos';
}

export const CourseCard = ({
  curso,
  userRole,
  isAuthenticated,
  estaInscrito,
  onEdit,
  onDelete,
  onInscribirse,
  onCancelInscription,
  variant = 'cursos'
}: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden relative flex flex-col h-full">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-700"></div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{curso.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{curso.description}</p>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <svg 
              className="w-4 h-4 text-purple-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-label="Duración del curso"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-sm">Duración: {curso.duration_hours} horas</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <svg 
              className="w-4 h-4 text-purple-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-label="Instructor del curso"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm">Instructor: {curso.instructor}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <svg 
              className="w-4 h-4 text-purple-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-label="Precio del curso"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-sm">Precio: ${curso.price}</span>
          </div>
          
          {curso.start_date && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg 
                className="w-4 h-4 text-purple-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-label="Fecha de inicio del curso"
              >
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <span className="text-sm">Inicia: {new Date(curso.start_date).toLocaleDateString('es-ES')}</span>
            </div>
          )}
        </div>

        {variant === 'cursos' ? (
          userRole === 'admin' ? (
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => onEdit?.(curso)}
                className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition-colors cursor-pointer text-sm font-medium flex-1"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete?.(curso)}
                className="bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors cursor-pointer text-sm font-medium flex-1"
              >
                Eliminar
              </button>
            </div>
          ) : (
            <button
              onClick={() => onInscribirse?.(curso.id)}
              disabled={!isAuthenticated || estaInscrito?.(curso.id)}
              title={
                !isAuthenticated 
                  ? 'Debes estar logueado para inscribirte' 
                  : estaInscrito?.(curso.id)
                    ? 'Ya tienes este curso tomado'
                    : ''
              }
              className={`w-full py-3 px-4 rounded-md transition-colors mt-auto font-medium ${
                !isAuthenticated
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : estaInscrito?.(curso.id)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
              }`}
            >
              {!isAuthenticated 
                ? 'Inicia sesión para inscribirte' 
                : estaInscrito?.(curso.id)
                  ? 'Curso tomado'
                  : 'Inscribirse'
              }
            </button>
          )
        ) : (
          <button 
            onClick={() => onCancelInscription?.(curso)}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors cursor-pointer text-sm font-medium mt-auto"
          >
            Cancelar Inscripción
          </button>
        )}
      </div>
    </div>
  );
};