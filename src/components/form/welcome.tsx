import { FormContext } from "@/context/form";
import { useContext } from "preact/hooks";

export default function Welcome() {
  const { handleStartForm } = useContext(FormContext);
  return (
    <div className="max-h-dvh h-full w-dvw flex md:flex-row flex-col-reverse">
      <div className="flex-1 md:pl-32 pl-6 pr-6 flex flex-col md:justify-center justify-evenly md:gap-y-12 ">
        <div className="md:space-y-10 text-white">
          <h1 className="md:text-6xl text-5xl font-bold text-pretty">
            Listo para dar el siguiente paso?
          </h1>
          <span className="md:text-xl text-base opacity-80">
            Lleva tu marca o negocio al siguiente nivel, completa el formulario
            y nos pondremos en contacto contigo.
          </span>
        </div>
        <div className="flex gap-x-3 md:flex-row flex-col md:items-center items-start">
          <button
            type="button"
            onClick={handleStartForm}
            className="bg-secondary text-black font-medium md:w-fit w-full px-6 py-3 text-xl rounded-lg outline-none focus:ring-offset-2 focus:ring-offset-black "
          >
            Empezar formulario
          </button>
          <span>
            Press <kbd className="text-secondary">Enter</kbd>
          </span>
        </div>
      </div>
      <div className="flex md:justify-end md:order-2 order-1 md:h-full h-80 md:w-1/2 w-full">
        <img
          src="/_thumbnails/po.webp"
          height={1000}
          width={600}
          loading="lazy"
          decoding="async"
          className="aspect-auto object-cover"
          alt="Personas trabajando en una oficina"
        />
      </div>
    </div>
  );
}
