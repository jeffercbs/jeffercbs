import type { QuestionType } from "./types";

export const questions: QuestionType[] = [
  {
    id: "name",
    question: "¿Cuál es tu nombre?",
    type: "text",
    placeholder: "Ej: Juan Pérez",
    description: "Ingresa tu nombre completo para poder contactarte",
  },
  {
    id: "email",
    question: "¿Cuál es tu correo electrónico?",
    type: "email",
    placeholder: "tu@email.com",
    description: "Te contactaremos a través de este correo",
  },
  {
    id: "phone",
    question: "¿Cuál es tu número de teléfono?",
    type: "tel",
    placeholder: "+57 XXX XXX XXX",
    description: "Un número donde podamos contactarte",
  },
  {
    id: "company",
    question: "¿Cuál es el nombre de tu empresa?",
    type: "text",
    placeholder: "Ej: Mi Empresa S.L.",
    description: "El nombre de tu empresa o proyecto",
  },
  {
    id: "affair",
    question: "¿Qué tipo de proyecto necesitas?",
    type: "single-select",
    options: [
      "Sitio Web",
      "E-commerce",
      "Aplicación Web",
      "Landing Page",
      "Blog",
      "Mentoria",
    ],
    description:
      "Selecciona el tipo de proyecto que mejor se ajuste a tus necesidades",
  },
  {
    id: "additionalInfo",
    question: "Cuentanos más sobre lo que necesitas",
    type: "textarea",
    placeholder:
      "Ej: Necesito un sitio web para mi negocio, con una estructura clara y fácil de navegar",
  },
  {
    id: "estimatedBudget",
    question: "¿Cuál es tu presupuesto estimado?",
    type: "number",
    placeholder: "Ej: 500.000 a 1.000.000",
    description: "Selecciona un rango de presupuesto aproximado",
  },
  {
    id: "referenceLink",
    question: "¿Tienes algún sitio web de referencia?",
    type: "url",
    placeholder: "https://ejemplo.com",
    description: "Comparte enlaces de sitios que te gusten como referencia",
  },
];
