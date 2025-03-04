import { FormContext } from "@/context/form";
import { useContext } from "preact/hooks";
import { questions } from "./const";
import { LoadingScreen } from "./loading-screen";
import { NavigationArrows } from "./navigation";
import { QuestionInput } from "./question-input";
import { QuestionSelect } from "./question-select";
import type { FormData } from "./schema";
import { SearchableSelect } from "./searchable-select";
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
  } = useContext(FormContext);

  return (
    <div
      style={{
        background:
          " radial-gradient(at 74% 19%, #384137 0px, transparent 50%), radial-gradient(at 26% 78%, #406661 0px, transparent 50%), radial-gradient(at 12% 93%, #3bb873 0px, transparent 50%), radial-gradient(at 61% 84%, #94ed88 0px, transparent 50%), #384137",
      }}
      className="h-dvh w-dvw flex items-center justify-center p-4 overflow-hidden"
    >
      {isLoading ? (
        <LoadingScreen />
      ) : currentStep === -1 ? (
        <Welcome />
      ) : currentStep === questions.length ? (
        <SummaryView />
      ) : (
        <div className="max-w-3xl w-full space-y-3">
          {currentQuestion && (
            <div
              key={currentStep}
              className={`space-y-8 transition-all duration-500 ease-in-out  ${
                direction === "up" ? "animate-slide-up" : "animate-slide-up-out"
              }`}
            >
              <h2 className="text-3xl font-bold mb-6">
                {currentQuestion.question}
              </h2>

              {currentQuestion.type === "single-select" ||
              currentQuestion.type === "multi-select" ? (
                currentQuestion.id === "feactures" ||
                currentQuestion.id === "preferredTechnology" ? (
                  <SearchableSelect
                    options={currentQuestion.options || []}
                    selected={
                      (formData[
                        currentQuestion.id as keyof FormData
                      ] as unknown as string[]) || []
                    }
                    onChange={handleSelectChange}
                    description={currentQuestion.description}
                    question={currentQuestion.question}
                    error={errors[currentQuestion.id as keyof FormData]}
                  />
                ) : (
                  <QuestionSelect
                    options={currentQuestion.options || []}
                    selected={
                      formData[currentQuestion.id as keyof FormData] ||
                      (currentQuestion.type === "multi-select" ? [] : "")
                    }
                    onChange={handleSelectChange}
                    isMulti={currentQuestion.type === "multi-select"}
                    description={currentQuestion.description}
                    question={currentQuestion.question}
                    error={errors[currentQuestion.id as keyof FormData]}
                  />
                )
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
                  error={errors[currentQuestion.id as keyof FormData]}
                />
              )}

              <div className="min-h-20 flex flex-col gap-y-2 justify-end items-start">
                {errors[currentQuestion.id as keyof FormData] && (
                  <small
                    id={`error-${name}`}
                    className="rounded-lg bg-yellow-800/30 text-yellow-200 shadow-2xl px-3 py-1 text-sm animate-slide-up"
                  >
                    {errors[currentQuestion.id as keyof FormData]}
                  </small>
                )}
                {currentQuestion.description && (
                  <small className="text-inherial/80 text-sm font-semibold bg-black/50 rounded-lg py-1 px-2 w-fit">
                    {currentQuestion.description}
                  </small>
                )}
              </div>
            </div>
          )}
          <NavigationArrows />

          <div class="fixed inset-x-8 bottom-8 flex flex-col justify-center items-center gap-2 animate-fade-in">
            <div className="w-1/2 bg-black/20 h-2 mt-8 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                }}
                role="progressbar"
                aria-valuenow={((currentStep + 1) / questions.length) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <span class="bg-black/50 text-white/90 text-sm font-semibold rounded-lg px-2 py-1">
              {currentStep + 1} / {questions.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
