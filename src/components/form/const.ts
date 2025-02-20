import type { QuestionType } from "./types";

export const questions: QuestionType[] = [
  {
    id: "projectDescription",
    question: "Describe tu proyecto",
    type: "lexical",
    placeholder: "Cuéntanos más sobre tu proyecto...",
    description:
      "Describe los objetivos y necesidades principales de tu proyecto",
  },
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
    placeholder: "+34 XXX XXX XXX",
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
    id: "project",
    question: "¿Qué tipo de proyecto necesitas?",
    type: "single-select",
    options: [
      "Sitio Web",
      "E-commerce",
      "Aplicación Web",
      "Landing Page",
      "Blog",
      "Otro",
    ],
    description:
      "Selecciona el tipo de proyecto que mejor se ajuste a tus necesidades",
  },

  {
    id: "feactures",
    question: "¿Qué características principales necesitas?",
    type: "multi-select",
    options: [
      "Diseño Responsivo",
      "Panel de Administración",
      "Blog",
      "Carrito de Compras",
      "Integración con Redes Sociales",
      "Chat en Vivo",
      "Sistema de Usuarios",
      "SEO Optimizado",
      "Analíticas",
      "Multiidioma",
    ],
    description: "Selecciona todas las características que necesitas",
  },
  {
    id: "preferredTechnology",
    question: "¿Qué tecnologías prefieres?",
    type: "multi-select",
    options: [
      "React",
      "Next.js",
      "Vue.js",
      "Node.js",
      "Python",
      "PHP",
      "WordPress",
      "No tengo preferencia",
    ],
    description: "Selecciona las tecnologías que prefieras para tu proyecto",
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
