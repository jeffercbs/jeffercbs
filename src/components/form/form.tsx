import { FormContext } from "@/context/form";
import { useContext, useEffect } from "preact/hooks";
import { questions } from "./const";
import { LoadingScreen } from "./loading-screen";
import { NavigationArrows } from "./navigation";
import { QuestionInput } from "./question-input";
import { QuestionSelect } from "./question-select";
import type { FormData } from "./schema";
import { SummaryView } from "./summary-view";
import Welcome from "./welcome";

export default function FormContent() {
  const {
    isLoading,
    handleInputChange,
    currentStep,
    currentQuestion,
    handleSelectChange,
    formData,
    errors,
    direction,
    handleNext,
    handlePrevious,
  } = useContext(FormContext);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "Enter":
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious]);

  return (
    <div
      className="h-dvh w-dvw flex items-center justify-cente overflow-hidden"
      style={{ background: "var(--gradient)" }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : currentStep === -1 ? (
        <Welcome />
      ) : currentStep === questions.length ? (
        <SummaryView />
      ) : (
        <div className="max-w-3xl mx-auto w-full space-y-3">
          {currentQuestion && (
            <div
              key={currentStep}
              className={`space-y-8 transition-all duration-500 ease-in-out  ${
                direction === "up" ? "animate-slide-up" : "animate-slide-up-out"
              }`}
            >
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.description && (
                  <p className="text-white/80 ">
                    {currentQuestion.description}
                  </p>
                )}
              </div>

              {currentQuestion.type === "single-select" ||
              currentQuestion.type === "multi-select" ? (
                <QuestionSelect
                  options={currentQuestion.options || []}
                  selected={
                    formData[currentQuestion.id as keyof FormData] || ""
                  }
                  onChange={handleSelectChange}
                  isMulti={currentQuestion.type === "multi-select"}
                  description={currentQuestion.description}
                  question={currentQuestion.question}
                  error={errors[currentQuestion.id as keyof typeof errors]}
                />
              ) : (
                <QuestionInput
                  id={currentQuestion.id}
                  type={currentQuestion.type}
                  value={
                    formData[
                      currentQuestion.id as keyof FormData
                    ]?.toString() || ""
                  }
                  name={currentQuestion.id}
                  onChange={handleInputChange}
                  placeholder={currentQuestion.placeholder}
                  description={currentQuestion.description}
                  question={currentQuestion.question}
                  error={errors[currentQuestion.id as keyof typeof errors]}
                />
              )}

              {errors[currentQuestion.id as keyof typeof errors] && (
                <small
                  id={`error-${name}`}
                  className="rounded-lg bg-white text-red-800 shadow-2xl px-3 py-1 text-sm animate-slide-up"
                >
                  {errors[currentQuestion.id as keyof typeof errors]}
                </small>
              )}
            </div>
          )}
          <NavigationArrows />

          <div class="fixed inset-x-8 bottom-8 flex flex-col justify-center items-center gap-2 animate-fade-in">
            <div className="w-1/2 bg-black/20 h-2 mt-8 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                }}
                role="progressbar"
                aria-valuenow={((currentStep + 1) / questions.length) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <span class="bg-black/50 text-secondary/90 text-sm font-semibold rounded-lg px-2 py-1">
              {currentStep + 1} / {questions.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
