import { z } from "zod";

export const clientSchema = z.object({
  id: z.string(),

  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string(),

  project: z.string().default("web"),
  projectDescription: z.string(),
  referenceLink: z.string(),
  feactures: z.string(),
  preferredTechnology: z.string(),
  estimatedBudget: z.string(),
});
