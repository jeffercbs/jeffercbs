import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "preact/compat";
import type { JSX } from "preact";
import clsx from "clsx";

interface SearchableSelectProps {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  description?: string;
  question: string;
  error?: string;
}

export function SearchableSelect({
  options,
  selected,
  onChange,
  question,
  error,
}: SearchableSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const toggleOption = useCallback(
    (option: string) => {
      const newSelected = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      onChange(newSelected);
    },
    [selected, onChange]
  );

  const removeOption = useCallback(
    (optionToRemove: string) => {
      onChange(selected.filter((item) => item !== optionToRemove));
    },
    [selected, onChange]
  );

  const handleSearchChange = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement>) => {
      const value = (e.currentTarget as HTMLInputElement).value;
      setSearchTerm(value || "");
    },
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative" ref={dropdownRef}>
        <div
          className={`flex focus:border-b-8 items-center justify-between px-6 py-3 rounded-lg cursor-pointer
            border-b-4 transition-all duration-300 ease-in-out transform
            ${error ? "border-red-500" : "border-b-black/20"}
            active:scale-95`}
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setTimeout(() => inputRef.current?.focus(), 100);
            }
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={question}
            className="w-full bg-transparent text-black text-xl placeholder-black/50 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black/50 size-5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <div
          className={clsx(
            "w-full h-fit mt-2 transition-all duration-300 ease-in-out transform origin-top",
            {
              "opacity-100 scale-100": isOpen,
              "opacity-0 scale-95 pointer-events-none": !isOpen,
            }
          )}
        >
          <div
            className={clsx("overflow-y-auto space-y-2", {
              "max-h-60": isOpen,
              "max-h-0": !isOpen,
            })}
          >
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={`px-6 py-2 cursor-pointer rounded-lg border-2 border-black transition-colors duration-300
                  ${
                    selected.includes(option)
                      ? "bg-black text-white"
                      : "bg-black/10"
                  }`}
                onClick={() => toggleOption(option)}
              >
                {option}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-4 text-black/50 text-center">
                No se encontraron resultados
              </div>
            )}
          </div>
        </div>
      </div>

      {selected.length > 0 && !isOpen && (
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex size-fit items-center gap-1 bg-black/20 text-black p-3 rounded-lg text-base animate-fade-in"
            >
              {item}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(item);
                }}
                className="p-1 hover:bg-black/10 rounded-lg transition-colors duration-300"
                aria-label={`Eliminar ${item}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
