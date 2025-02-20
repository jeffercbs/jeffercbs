import { FormContext } from "@/context/form";
import clsx from "clsx";
import { useContext } from "preact/hooks";
import { questions } from "./const";

export function NavigationArrows() {
  const { handleNext, handlePrevious, currentStep } = useContext(FormContext);

  return (
    <div className="w-fit flex gap-x-3">
      <button
        onClick={handlePrevious}
        disabled={currentStep <= 0}
        className={clsx(
          {
            "bg-black/70 hover:bg-black": currentStep >= 0,
          },
          "p-3 disabled:opacity-50 bg-black text-white hover:bg-black/80 disabled:cursor-not-allowed rounded-lg transition-all duration-300 ease-in-out hover:scale-110 active:scale-90"
        )}
        aria-label="Pregunta anterior"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        disabled={currentStep === questions.length}
        className={clsx(
          "p-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-black/80 text-white bg-black duration-300 ease-in-out hover:scale-110 active:scale-90",
          {
            "text-white hover:bg-black/80 bg-black": currentStep !== 0,
          }
        )}
        aria-label="Siguiente pregunta"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
