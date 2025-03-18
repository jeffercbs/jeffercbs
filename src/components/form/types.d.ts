import { formSchema } from "./schema";
export interface QuestionType {
  id: keyof typeof formSchema.shape;
  type:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "textarea"
    | "single-select"
    | "multi-select"
    | "date"
    | "number";
  question: string;
  options?: string[];
  description?: string;
  placeholder?: string;
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
