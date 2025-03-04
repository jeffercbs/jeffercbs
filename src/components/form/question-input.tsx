import clsx from "clsx";
import type { ChangeEvent } from "preact/compat";
import type { QuestionType } from "./types";

interface QuestionInputProps extends QuestionType {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

export function QuestionInput({
  type,
  value,
  name,
  onChange,
  placeholder,
  question,
  error,
}: QuestionInputProps) {
  const inputProps = {
    id: `question-${name}`,
    name,
    value,
    onChange,
    placeholder,
    className: clsx(
      "w-full bg-black/30 border-2 rounded-lg border-white text-white text-base md:text-xl px-6 py-3 placeholder:text-white/50 focus:outline-none transition-colors duration-300",
      { "border-yellow-500": error }
    ),
    "aria-label": question,
    "aria-invalid": !!error,
    "aria-describedby": error ? `error-${name}` : undefined,
  };

  return (
    <div className="space-y-6 animate-fade-in ">
      <label className="sr-only" htmlFor={`question-${name}`}>
        {question}
      </label>

      {type === "textarea" ? (
        <textarea
          {...inputProps}
          className={clsx(
            "w-full min-h-[300px] border text-white p-6 placeholder:text-white/50 focus:outline-none resize-none transition-colors duration-300",
            { "border-yellow-900": error }
          )}
        />
      ) : (
        <input type={type} {...inputProps} />
      )}
    </div>
  );
}
