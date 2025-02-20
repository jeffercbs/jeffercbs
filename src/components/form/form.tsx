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
import { EditorRender } from "./lexical-form";

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
    <div className="h-dvh bg-gradient-to-b text-neutral-950 from-green-400 via-80% to-100% via-green-300 to-green-100 flex items-center justify-center p-4 overflow-hidden">
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
              <h2 className="text-2xl text-inherit font-medium mb-6">
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
                      ] as string[]) || []
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
              ) : currentQuestion.type === "lexical" ? (
                <EditorRender />
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
            </div>
          )}
          <NavigationArrows />

          <div class="fixed inset-x-8 bottom-8 flex justify-center items-center gap-2 animate-fade-in">
            <div className="w-1/2 bg-black/20 h-1 mt-8 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                }}
                role="progressbar"
                aria-valuenow={((currentStep + 1) / questions.length) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
