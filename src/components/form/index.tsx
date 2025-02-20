import { FormProvider } from "@/context/form";
import FormContent from "./form";

export default function Form() {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
}
