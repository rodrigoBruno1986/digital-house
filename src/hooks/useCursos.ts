'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Course, CourseFormData } from '@/types/course';
import { UseCursosReturn } from '@/types/hooks';

export const useCursos = (): UseCursosReturn => {
  const queryClient = useQueryClient();
  
  const { data: cursos = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ['cursos'],
    queryFn: async (): Promise<Course[]> => {
      const response = await fetch('/api/cursos');
      if (!response.ok) {
        throw new Error('Error al cargar cursos');
      }
      const result = await response.json();
      return result.cursos || [];
    },
  });

  const deleteCurso = async (courseId: string): Promise<void> => {
    await fetch(`/api/cursos?id=${courseId}`, {
      method: 'DELETE',
    });
    queryClient.invalidateQueries({ queryKey: ['cursos'] });
  };

  const crearCurso = async (data: CourseFormData): Promise<void> => {
    await fetch('/api/cursos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    queryClient.invalidateQueries({ queryKey: ['cursos'] });
  };

  const editCurso = async (courseId: string, data: CourseFormData): Promise<void> => {
    await fetch('/api/cursos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, id: courseId }),
    });
    queryClient.invalidateQueries({ queryKey: ['cursos'] });
  };

  return {
    cursos,
    isLoading,
    error,
    crearCurso,
    deleteCurso,
    editCurso,
  };
};
