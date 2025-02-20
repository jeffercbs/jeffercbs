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
  description,
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
      "w-full border-b-4 focus:border-b-8 border-b-black/20 text-black text-xl px-6 py-3 placeholder:text-black/50 focus:outline-none transition-colors duration-300",
      { "border-red-500": error }
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
            "w-full min-h-[250px] border-b-2 border-b-black/20 text-black p-6 rounded-lg placeholder:text-black/50  focus:outline-none focus:border-b-black resize-none transition-colors duration-300",
            { "border-red-900": error }
          )}
        />
      ) : (
        <input type={type} {...inputProps} />
      )}

      <div className="min-h-10 flex flex-col justify-center items-start">
        {error && (
          <p
            id={`error-${name}`}
            className="text-red-500 text-sm animate-slide-up"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
