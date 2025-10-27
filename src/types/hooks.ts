import { Course, CourseFormData } from './course';

export interface UseCursosReturn {
  cursos: Course[];
  isLoading: boolean;
  error: Error | null;
  crearCurso: (data: CourseFormData) => Promise<void>;
  deleteCurso: (courseId: string) => Promise<void>;
  editCurso: (courseId: string, data: CourseFormData) => Promise<void>;
}

export interface InscripcionData {
  curso_id: string;
  usuario_id: string;
  documento: string;
  ciudad: string;
  edad: number;
}

export interface UseInscripcionesReturn {
  inscripciones: Course[];
  isLoading: boolean;
  anularInscripcion: (cursoId: string) => Promise<void>;
  inscribirse: (cursoId: string) => Promise<void>;
  estaInscrito: (cursoId: string) => boolean;
}
