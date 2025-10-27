'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { InscriptionStore } from '@/types/inscription';

export const useInscriptionStore = create<InscriptionStore>()(
  persist(
    (set) => ({
      documento: '',
      ciudad: '',
      edad: 0,
      curso_id: null,

      setData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      setCursoId: (id) =>
        set(() => ({
          curso_id: id,
        })),

      resetCursoId: () =>
        set(() => ({
          curso_id: null,
        })),

      resetAll: () =>
        set(() => ({
          documento: '',
          ciudad: '',
          edad: 0,
          curso_id: null,
        })),

      reset: () =>
        set(() => ({
          documento: '',
          ciudad: '',
          edad: 0,
          curso_id: null,
        })),
    }),
    {
      name: 'inscription-storage',
      storage: typeof window !== 'undefined' 
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
);
