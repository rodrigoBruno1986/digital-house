import { z } from 'zod';

export const inscriptionSchema = z.object({
  documento: z.string()
    .min(8, 'El DNI debe tener exactamente 8 dígitos')
    .max(8, 'El DNI debe tener exactamente 8 dígitos')
    .regex(/^\d{8}$/, 'El DNI debe contener solo números'),
  ciudad: z.string()
    .min(2, 'Ciudad debe tener al menos 2 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'La ciudad solo puede contener letras'),
  edad: z.number().min(18, 'Debe ser mayor de 18 años').max(120, 'Edad inválida'),
});

export type InscriptionFormData = z.infer<typeof inscriptionSchema>;
