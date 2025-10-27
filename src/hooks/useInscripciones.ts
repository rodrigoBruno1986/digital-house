'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Course } from '@/types/course';
import { UseInscripcionesReturn, InscripcionData } from '@/types/hooks';

export const useInscripciones = (userId: string | undefined): UseInscripcionesReturn => {
  const queryClient = useQueryClient();
  
  const { data: inscripciones = [], isLoading } = useQuery<Course[]>({
    queryKey: ['inscripciones', userId],
    queryFn: async (): Promise<Course[]> => {
      if (!userId) return [];
      
      const response = await fetch(`/api/mis-cursos?userId=${userId}`);
      const result = await response.json();
      return result.cursos || [];
    },
    enabled: !!userId,
  });

  const anularInscripcion = async (cursoId: string): Promise<void> => {
    if (!userId) return;
    
    await fetch(`/api/inscripciones?curso_id=${cursoId}&usuario_id=${userId}`, {
      method: 'DELETE',
    });
    
    queryClient.invalidateQueries({ queryKey: ['inscripciones', userId] });
    queryClient.invalidateQueries({ queryKey: ['mis-cursos', userId] });
  };

  const inscribirse = async (cursoId: string): Promise<void> => {
    if (!userId) return;
    
    const inscripcionData: InscripcionData = {
      curso_id: cursoId,
      usuario_id: userId,
      documento: '12345678',
      ciudad: 'Buenos Aires',
      edad: 25,
    };
    
    await fetch('/api/inscripciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inscripcionData),
    });
    
    queryClient.invalidateQueries({ queryKey: ['inscripciones', userId] });
    queryClient.invalidateQueries({ queryKey: ['mis-cursos', userId] });
  };

  const estaInscrito = (cursoId: string): boolean => {
    return inscripciones.some((curso: Course) => curso.id === cursoId);
  };

  return {
    inscripciones,
    isLoading,
    anularInscripcion,
    inscribirse,
    estaInscrito,
  };
};