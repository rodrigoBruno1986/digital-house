'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useInscripciones } from '@/hooks/useInscripciones';
import { SimpleConfirmModal } from '@/components/SimpleConfirmModal';
import { CourseCard } from '@/components/CourseCard';
import { NoContentState } from '@/components/NoContentState';
import { Course } from '@/types/course';
import toast from 'react-hot-toast';

export default function MisCursosPage() {
    const { data: session } = useSession();
    const user = session?.user;
    const isAuthenticated = !!session;
    const { inscripciones: misCursos = [], isLoading, anularInscripcion } = useInscripciones(user?.id);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    const handleCancelInscription = useCallback((curso: Course) => {
        setCourseToDelete(curso);
        setIsDeleteOpen(true);
    }, []);

    const confirmDelete = useCallback(async () => {
        if (courseToDelete && user?.id) {
            try {
                await anularInscripcion(courseToDelete.id);
                toast.success('¡Inscripción cancelada exitosamente!');
                setIsDeleteOpen(false);
                setCourseToDelete(null);
            } catch (error) {
                toast.error('Error al cancelar la inscripción');
            }
        }
    }, [courseToDelete, user?.id, anularInscripcion]);

    const renderedMisCursos = useMemo(() => {
        return (misCursos as Course[]).map((curso: Course) => (
            <CourseCard
                key={curso.id}
                curso={curso}
                onCancelInscription={handleCancelInscription}
                variant="mis-cursos"
            />
        ));
    }, [misCursos, handleCancelInscription]);


    if (!isAuthenticated) {
        return (
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mis Cursos</h1>
                        <p className="text-gray-600 mb-8">Debes iniciar sesión para ver tus cursos</p>
                        <Link
                            href="/"
                            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors cursor-pointer font-medium"
                        >
                            Ir al inicio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-4xl font-bold text-gray-900">Mis Cursos</h1>
                    <p className="text-gray-600 mt-2">Cursos en los que estás inscrito</p>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {!isLoading && (misCursos as Course[]).length === 0 && (
                    <NoContentState
                        icon={
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        }
                        title="No tenes cursos suscritos"
                        description="Explora nuestros cursos disponibles y comienza tu aprendizaje"
                        buttonText="Ver todos los cursos"
                        buttonHref="/cursos"
                    />
                )}

                {!isLoading && (misCursos as Course[]).length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {renderedMisCursos}
                    </div>
                )}
            </div>

            {isDeleteOpen && (
                <SimpleConfirmModal
                    isOpen={isDeleteOpen}
                    onClose={() => {
                        setIsDeleteOpen(false);
                        setCourseToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    title="Cancelar suscripción"
                    message={`¿Estás seguro que queres cancelar tu suscripción al curso "${courseToDelete?.title}"?`}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}
