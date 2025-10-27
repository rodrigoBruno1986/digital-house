'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';
import { InscriptionForm } from '@/components/InscriptionForm';
import { useInscriptionStore } from '@/stores/inscriptionStore';
import { useSession } from 'next-auth/react';
import { useCursos } from '@/hooks/useCursos';
import { useInscripciones } from '@/hooks/useInscripciones';
import { EditCourseModal } from '@/components/EditCourseModal';
import { SimpleConfirmModal } from '@/components/SimpleConfirmModal';
import { CourseCard } from '@/components/CourseCard';
import { NoContentState } from '@/components/NoContentState';
import { Course } from '@/types/course';
import toast from 'react-hot-toast';

export default function CursosPage() {
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const { setCursoId } = useInscriptionStore();
  const { data: session } = useSession();
  const user = session?.user;
  const isAuthenticated = !!session;
  const { cursos = [], isLoading, error, deleteCurso } = useCursos();
  const { estaInscrito } = useInscripciones(user?.id);

  const handleEdit = useCallback((curso: Course) => {
    setSelectedCourse(curso);
    setIsEditOpen(true);
  }, []);

  const handleDelete = useCallback((curso: Course) => {
    setCourseToDelete(curso);
    setIsDeleteOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (courseToDelete) {
      try {
        await deleteCurso(courseToDelete.id);
        toast.success('¡Curso eliminado exitosamente!');
        setIsDeleteOpen(false);
        setCourseToDelete(null);
      } catch (error) {
        toast.error('Error al eliminar el curso');
      }
    }
  }, [courseToDelete, deleteCurso]);

  const handleInscribirse = useCallback((cursoId: string) => {
    if (!isAuthenticated) {
      return;
    }

    if (user?.role === 'admin') {
      return;
    }

    setCursoId(cursoId);
    setIsInscriptionOpen(true);
  }, [isAuthenticated, user?.role, setCursoId]);

  const renderedCursos = useMemo(() => {
    if (!cursos || !Array.isArray(cursos)) return [];
    return cursos
      .filter((curso: Course) => {
        if (user?.role === 'admin') return true;
        
        if (!isAuthenticated) return true;
        
        return !estaInscrito?.(curso.id);
      })
      .map((curso: Course) => (
        <CourseCard
          key={curso.id}
          curso={curso}
          userRole={user?.role}
          isAuthenticated={isAuthenticated}
          estaInscrito={estaInscrito}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onInscribirse={handleInscribirse}
          variant="cursos"
        />
      ));
  }, [cursos, user?.role, isAuthenticated, estaInscrito, handleEdit, handleDelete, handleInscribirse]);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Volver al inicio
          </Link>
          
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">
              {user?.role === 'admin' ? 'Gestión de Cursos' : 'Cursos Disponibles'}
            </h1>
            
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear
              </Link>
            )}
          </div>
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}
        {error && (
          <NoContentState
            icon={
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            }
            title="Error de conexión"
            description="No pudimos conectar con el servidor. Verifica tu conexión a internet."
            buttonText="Reintentar"
            buttonHref="/"
            errorType="network"
            onRetry={() => window.location.reload()}
          />
        )}
        
        {!isLoading && !error && (cursos.length === 0 || (isAuthenticated && user?.role !== 'admin' && cursos.length > 0 && renderedCursos.length === 0)) && (
          <NoContentState
            icon={
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            title={cursos.length === 0 ? "No hay cursos disponibles" : "¡Ya estás inscrito en todos los cursos!"}
            description={cursos.length === 0 ? "Pronto agregaremos nuevos cursos para ti" : "Has completado todos los cursos disponibles. ¡Felicitaciones!"}
            buttonText={cursos.length === 0 ? "Volver al inicio" : "Ver mis cursos"}
            buttonHref={cursos.length === 0 ? "/" : "/mis-cursos"}
          />
        )}

        {!isLoading && cursos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderedCursos}
          </div>
        )}
      </div>

      {isInscriptionOpen && (
        <InscriptionForm onClose={() => setIsInscriptionOpen(false)} />
      )}

      {isEditOpen && (
        <EditCourseModal 
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
        />
      )}

      {isDeleteOpen && (
        <SimpleConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setCourseToDelete(null);
          }}
          onConfirm={confirmDelete}
          title="Eliminar Curso"
          message={`¿Estás seguro que queres eliminar el curso "${courseToDelete?.title}"? Esta acción no se puede deshacer.`}
          isLoading={false}
        />
      )}
    </div>
  );
}
