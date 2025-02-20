import { FormContext } from "@/context/form";
import { useContext } from "preact/hooks";

export default function Welcome() {
  const { handleStartForm } = useContext(FormContext);
  return (
    <div className="max-w-3xl w-full">
      <div className="space-y-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-inherial mb-l">
          ¿Listo para dar el siguiente paso?
        </h1>
        <p className="text-2xl text-inherial/90 mb-l ">
          Lleva tu marca o negocio al siguiente nivel
        </p>
        <button
          type="button"
          onClick={handleStartForm}
          className="bg-inherial text-lime-900 px-6 py-3 text-xl rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-inherial focus:ring-offset-2 focus:ring-offset-emerald-500 "
        >
          Comenzar
        </button>
      </div>
    </div>
  );
}
