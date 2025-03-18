import { createContext } from "preact";
import type { ReactElement } from "preact/compat";
import { useState, useEffect, useMemo, useCallback } from "preact/hooks";
import type { ChangeEvent } from "preact/compat";
import { questions } from "@/components/form/const";
import { formSchema } from "@/components/form/schema";
import { z } from "zod";
import { actions } from "astro:actions";

interface FormContextProps {
  isLoading: boolean;
  currentStep: number;
  formId: string;
  formData: z.infer<typeof formSchema>;
  errors: Partial<Record<keyof FormData, string>>;
  direction: "up" | "down";
  currentQuestion: (typeof questions)[number] | null;
  validateField: (field: keyof FormData, value: any) => boolean;
  isCurrentQuestionValid: () => boolean;
  handleStartForm: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSelectChange: (value: string | string[]) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => Promise<void>;
}

const DEFAULT_DATA_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  affair: "",
  additionalInfo: "",
  referenceLink: "",
  estimatedBudget: "",
};

export const FormContext = createContext<FormContextProps>({
  isLoading: true,
  currentStep: -1,
  formId: "",
  formData: DEFAULT_DATA_FORM,
  errors: {},
  direction: "down",
  currentQuestion: null,
  validateField: () => false,
  isCurrentQuestionValid: () => false,
  handleStartForm: () => {},
  handleNext: () => {},
  handlePrevious: () => {},
  handleSelectChange: () => {},
  handleInputChange: () => {},
  handleSubmit: async () => {},
});

export const FormProvider = ({ children }: { children: ReactElement }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(-1);
  const [formId] = useState(
    () => `form_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  );
  const [formData, setFormData] =
    useState<z.infer<typeof formSchema>>(DEFAULT_DATA_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const currentQuestion = useMemo(() => {
    if (currentStep < 0 || currentStep >= questions.length) return null;
    return questions[currentStep];
  }, [currentStep]);

  const validateField = useCallback((field: keyof FormData, value: any) => {
    try {
      formSchema.shape[field as keyof typeof formSchema.shape].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
        }
      }
      return false;
    }
  }, []);

  const isCurrentQuestionValid = useCallback((): boolean => {
    if (currentStep === -1) return true;
    if (!currentQuestion) return false;

    const field = currentQuestion.id as keyof FormData;
    const value = formData?.[field as keyof typeof formData] ?? undefined;
    return validateField(field, value);
  }, [currentStep, currentQuestion, formData, validateField]);

  const handleStartForm = useCallback(() => {
    setCurrentStep(0);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < questions.length && isCurrentQuestionValid()) {
      setCurrentStep((prev) => prev + 1);
      setDirection("down");
    }
  }, [currentStep, isCurrentQuestionValid]);

  const handlePrevious = useCallback(() => {
    if (currentStep > -1) {
      setCurrentStep((prev) => prev - 1);
      setDirection("up");
    }
  }, [currentStep]);

  const handleSelectChange = useCallback(
    (value: any) => {
      if (!currentQuestion) return;
      const field = currentQuestion.id as keyof FormData;
      setFormData((prev) => ({ ...prev, [field]: value }));
      validateField(field, value);
    },
    [currentQuestion, validateField]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name as keyof FormData, value);
    },
    [validateField]
  );

  const handleSubmit = useCallback(async () => {
    const result = formSchema.safeParse(formData);

    if (result.success) {
      try {
        await actions.contact({ ...result.data, id: formId });
        handleNext();
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    } else {
      console.error(
        "Errores de validación:",
        result.error.flatten().fieldErrors
      );
    }
  }, [formData, formId]);

  return (
    <FormContext.Provider
      value={{
        isLoading,
        currentStep,
        formId,
        formData,
        errors,
        direction,
        currentQuestion,

        validateField,
        isCurrentQuestionValid,
        handleStartForm,
        handleNext,
        handlePrevious,
        handleSelectChange,
        handleInputChange,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
