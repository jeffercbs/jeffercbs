export interface QuestionType {
  id: keyof FormData;
  type:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "textarea"
    | "single-select"
    | "multi-select"
    | "date"
    | "number"
    | "lexical";
  question: string;
  options?: string[];
  description?: string;
  placeholder?: string;
}

export interface FormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  project: string;
  projectDescription: string;
  referenceLink: string;
  feactures: string[];
  preferredTechnology: string[];
  estimatedBudget: string;
}

export interface QuestionSelectProps {
  onChange: (value: string | string[]) => void;
  options: string[];
  selected: string | string[];
  isMulti: boolean;
  description?: string;
  question: string;
  error?: string;
}
