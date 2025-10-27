'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCursos } from '@/hooks/useCursos';
import { courseSchema, CourseFormData } from '@/schemas/course';
import { Course } from '@/types/course';
import toast from 'react-hot-toast';

interface CourseFormProps {
    mode: 'create' | 'edit';
    course?: Course | null;
    onSuccess?: () => void;
    onCancel?: () => void;
    showHeader?: boolean;
    headerTitle?: string;
}

export const CourseForm = ({
    mode,
    course,
    onSuccess,
    onCancel,
    showHeader = true,
    headerTitle
}: CourseFormProps) => {
    const { crearCurso, editCurso } = useCursos();
    const [isReview, setIsReview] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, reset: resetForm, trigger } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        mode: 'onSubmit',
        defaultValues: mode === 'create' ? {
            title: '',
            description: '',
            price: '',
            duration_hours: '',
            instructor: '',
            start_date: '',
        } : {
            title: course?.title || '',
            description: course?.description || '',
            price: course?.price?.toString() || '',
            duration_hours: course?.duration_hours?.toString() || '',
            instructor: course?.instructor || '',
            start_date: course?.start_date || '',
        },
    });

    const formData = watch();

    useEffect(() => {
        if (mode === 'create') {
            resetForm({
                title: '',
                description: '',
                price: '',
                duration_hours: '',
                instructor: '',
                start_date: '',
            });
        }
    }, [mode, resetForm]);

    useEffect(() => {
        if (course && mode === 'edit') {
            resetForm({
                title: course.title,
                description: course.description,
                price: course.price.toString(),
                duration_hours: course.duration_hours.toString(),
                instructor: course.instructor,
                start_date: course.start_date,
            });
        }
    }, [course, mode, resetForm]);

    const handleContinue = async () => {
        const isValid = await trigger();
        if (!isValid) return;

        setIsReview(true);
    };

    const handleBack = () => {
        setIsReview(false);
    };

    const handleSubmitForm = async (data: CourseFormData) => {
        setIsLoading(true);
        try {
            const courseData = {
                title: data.title,
                description: data.description,
                instructor: data.instructor,
                duration_hours: parseInt(data.duration_hours),
                price: parseFloat(data.price),
                start_date: data.start_date,
            };
            
            if (mode === 'create') {
                await crearCurso(courseData);
                toast.success('¡Curso creado exitosamente!');
                onSuccess?.();
            } else if (mode === 'edit' && course) {
                await editCurso(course.id, courseData);
                toast.success('¡Curso actualizado exitosamente!');
                onSuccess?.();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al procesar el curso');
        } finally {
            setIsLoading(false);
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const displayTitle = headerTitle || (mode === 'create' ? 'Crear Nuevo Curso' : 'Editar Curso');

    return (
        <div className="space-y-6">
            {showHeader && (
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{displayTitle}</h2>
                </div>
            )}

            {!isReview ? (
                <form onSubmit={handleSubmit(handleContinue)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Título del Curso
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register('title')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                    placeholder="Ej: React + Next.js"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    {...register('description')}
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                    placeholder="Describe el contenido del curso"
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    {...register('price')}
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                    placeholder="99.99"
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="duration_hours" className="block text-sm font-medium text-gray-700 mb-1">
                                    Duración (horas)
                                </label>
                                <input
                                    type="number"
                                    id="duration_hours"
                                    {...register('duration_hours')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                    placeholder="40"
                                />
                                {errors.duration_hours && <p className="text-red-500 text-xs mt-1">{errors.duration_hours.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">
                                    Instructor
                                </label>
                                <input
                                    type="text"
                                    id="instructor"
                                    {...register('instructor')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                    placeholder="Juan Pérez"
                                />
                                {errors.instructor && <p className="text-red-500 text-xs mt-1">{errors.instructor.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha de Inicio
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    {...register('start_date')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                />
                                {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors cursor-pointer font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors cursor-pointer font-medium"
                        >
                            Continuar
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Revisión del Curso</h2>
                    
                  

                    <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Título</p>
                            <p className="text-lg text-gray-900">{formData.title}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-600">Descripción</p>
                            <p className="text-gray-900">{formData.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Precio</p>
                                <p className="text-lg text-gray-900">${formData.price}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Duración</p>
                                <p className="text-lg text-gray-900">{formData.duration_hours} horas</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Instructor</p>
                                <p className="text-lg text-gray-900">{formData.instructor}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Fecha de Inicio</p>
                                <p className="text-lg text-gray-900">{formData.start_date}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors cursor-pointer font-medium"
                        >
                            Retroceder
                        </button>
                        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex-1">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer font-medium"
                            >
                                {isLoading ? 'Guardando...' : mode === 'create' ? 'Crear Curso' : 'Guardar Cambios'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
