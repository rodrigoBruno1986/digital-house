interface BaseFormData {
  documento: string;
  ciudad: string;
  edad: number;
}

export interface InscriptionFormData extends BaseFormData {
}

export interface Inscription extends BaseFormData {
  id: number;
  usuario_id: string;
  curso_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface InscriptionStore extends BaseFormData {
  curso_id: string | null;
  setData: (data: Partial<BaseFormData>) => void;
  setCursoId: (id: string) => void;
  resetCursoId: () => void;
  resetAll: () => void;
  reset: () => void;
}
