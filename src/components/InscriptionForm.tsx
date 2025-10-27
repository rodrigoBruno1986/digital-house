'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inscriptionSchema, InscriptionFormData } from '@/schemas/inscription';
import { useInscriptionStore } from '@/stores/inscriptionStore';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface InscriptionFormProps {
    onClose: () => void;
}

export const InscriptionForm = ({ onClose }: InscriptionFormProps) => {
    const { data: session } = useSession();
    const user = session?.user;
    const { documento, ciudad, edad, curso_id, setData, resetCursoId } = useInscriptionStore();
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm<InscriptionFormData>({
        resolver: zodResolver(inscriptionSchema),
        defaultValues: {
            documento,
            ciudad,
            edad: edad || undefined,
        },
    });

    const inscriptionMutation = useMutation({
        mutationFn: async (data: InscriptionFormData) => {
            const response = await fetch('/api/inscripciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    curso_id,
                    usuario_id: user?.id,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al inscribirse');
            }

            return result;
        },
        onSuccess: () => {
            toast.success('¡Inscripción exitosa!');
            
            resetCursoId();
            onClose();
            
            queryClient.invalidateQueries({ queryKey: ['cursos'] });
            queryClient.invalidateQueries({ queryKey: ['mis-cursos'] });
            queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
            queryClient.invalidateQueries({ queryKey: ['inscripciones', user?.id] });
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : 'Error desconocido');
        },
    });


    const onSubmit = (data: InscriptionFormData) => {
        if (!curso_id) {
            toast.error('No se seleccionó curso');
            return;
        }

        if (!user?.id) {
            toast.error('Debes estar logueado');
            return;
        }

        setData(data);
        inscriptionMutation.mutate(data);
    };

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            <div className="relative flex items-center justify-center min-h-screen p-4">
                <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                        title="Cerrar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Inscribirse al Curso</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">
                                DNI
                            </label>
                            <input
                                type="text"
                                id="documento"
                                {...register('documento')}
                                maxLength={8}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 ${errors.documento ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="12345678"
                            />
                            {errors.documento && (
                                <p className="text-red-500 text-sm mt-1">{errors.documento.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                                Ciudad
                            </label>
                            <input
                                type="text"
                                id="ciudad"
                                {...register('ciudad')}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 ${errors.ciudad ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Buenos Aires"
                            />
                            {errors.ciudad && (
                                <p className="text-red-500 text-sm mt-1">{errors.ciudad.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="edad" className="block text-sm font-medium text-gray-700 mb-1">
                                Edad
                            </label>
                            <input
                                type="number"
                                id="edad"
                                {...register('edad', { valueAsNumber: true })}
                                min="18"
                                max="120"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 ${errors.edad ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="25"
                            />
                            {errors.edad && (
                                <p className="text-red-500 text-sm mt-1">{errors.edad.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={inscriptionMutation.isPending}
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {inscriptionMutation.isPending ? 'Inscribiendo...' : 'Inscribirse'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
