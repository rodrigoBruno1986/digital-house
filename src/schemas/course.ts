import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, 'El precio debe contener solo números')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'El precio debe ser un número mayor a 0')
    .refine((val) => parseFloat(val) <= 999999, 'El precio no puede ser mayor a 999,999'),
  duration_hours: z.string()
    .regex(/^\d+$/, 'La duración debe contener solo números')
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, 'La duración debe ser un número mayor a 0')
    .refine((val) => parseInt(val) <= 1000, 'La duración no puede ser mayor a 1000 horas'),
  instructor: z.string().min(3, 'El nombre del instructor debe tener al menos 3 caracteres'),
  start_date: z.string().min(1, 'La fecha de inicio es requerida'),
});

export type CourseFormData = z.infer<typeof courseSchema>;
