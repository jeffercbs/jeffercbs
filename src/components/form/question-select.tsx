import clsx from "clsx";
import { useCallback } from "preact/hooks";

interface QuestionSelectProps {
  options: string[];
  selected: string | string[];
  onChange: (value: string | string[]) => void;
  isMulti?: boolean;
  description?: string;
  question: string;
  error?: string;
}

export function QuestionSelect({
  options,
  selected,
  onChange,
  isMulti,
  description,
  question,
}: QuestionSelectProps) {
  const handleSelect = useCallback(
    (option: string) => {
      if (isMulti) {
        const currentSelected = Array.isArray(selected) ? selected : [];
        const newSelected = currentSelected.includes(option)
          ? currentSelected.filter((item) => item !== option)
          : [...currentSelected, option];
        onChange(newSelected);
      } else {
        onChange(option);
      }
    },
    [isMulti, selected, onChange]
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div
        className="flex flex-col space-y-1"
        role={isMulti ? "group" : "radiogroup"}
        aria-label={question}
      >
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className={clsx(
              "px-6 py-2 max-w-2/5 border-4 border-black rounded-lg text-left text-lg transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] animate-fade-in delay-150",
              { "bg-black text-white": selected === option },
              {
                "bg-black/10 text-inherial hover:bg-inherial/20":
                  selected !== option,
              }
            )}
            role={isMulti ? "checkbox" : "radio"}
            aria-checked={
              isMulti
                ? Array.isArray(selected) && selected.includes(option)
                : selected === option
            }
          >
            {option}
          </button>
        ))}
      </div>
      {description && <p className="text-inherial/80 text-lg">{description}</p>}
    </div>
  );
}
