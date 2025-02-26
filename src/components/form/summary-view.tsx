import { FormContext } from "@/context/form";
import { useContext } from "preact/hooks";

export function SummaryView() {
  const { setRating, handleSubmit, handlePrevious, rating } =
    useContext(FormContext);

  return (
    <div className="max-w-3xl w-full space-y-8 animate-fade-in">
      <div className="space-y-4 pt-8 border-t border-inherial/20">
        <h3 className="text-2xl text-inherial">
          ¿Qué tan satisfecho estás con la información?
        </h3>
        <div className="flex gap-2 mb-6">
          {[0, 1, 2, 3, 4].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`${
                rating === value
                  ? "bg-inherial text-emerald-500"
                  : "bg-inherial/20 text-inherial"
              } rounded-full px-6 py-2 transition-all duration-300 transform hover:scale-110`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 bg-inherial text-emerald-600 px-8 py-6 text-xl rounded-lg 
                          transition-all duration-300 transform hover:scale-105
                          disabled:bg-inherial/20 disabled:text-inherial/50 disabled:cursor-not-allowed"
        >
          Enviar formulario
        </button>
        <button
          type="button"
          onClick={handlePrevious}
          className="px-8 py-6 text-xl rounded-lg border-2 border-inherial/20 text-inherial 
                          hover:bg-inherial/10 transition-all duration-300 transform hover:scale-105"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}
