import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre es requerido y debe tener al menos 2 caracteres"),
  email: z
    .string()
    .email("El correo electrónico es requerido y debe ser válido"),
  phone: z
    .string()
    .regex(
      /^\+?[0-9]{10,14}$/,
      "El número de teléfono es requerido y debe ser válido"
    ),
  company: z
    .string()
    .min(
      2,
      "El nombre de la empresa es requerido y debe tener al menos 2 caracteres"
    ),
  project: z.string().min(1, "Debes seleccionar un tipo de proyecto"),
  projectDescription: z
    .string()
    .min(
      10,
      "La descripción del proyecto es requerida y debe tener al menos 10 caracteres"
    ),
  referenceLink: z.string().url("La URL debe ser válida").or(z.literal("")),
  feactures: z
    .array(z.string())
    .min(1, "Debes seleccionar al menos una característica"),
  preferredTechnology: z
    .array(z.string())
    .min(1, "Debes seleccionar al menos una tecnología"),
  estimatedBudget: z
    .string()
    .min(1, "Debes seleccionar un rango de presupuesto"),
});

export type FormData = z.infer<typeof formSchema>;
