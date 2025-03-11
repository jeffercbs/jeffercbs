export function SummaryView() {
  return (
    <div className="md:max-w-xl text-center w-full space-y-8 animate-fade-in bg-black/50 text-white p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-white text-pretty">
        Gracias por comunicarte con nosotros, nos comunicaremos contigo en breve
      </h1>

      <a
        href="/"
        className="bg-secondary px-4 py-1 rounded-lg text-black text-base"
      >
        Regresar
      </a>
    </div>
  );
}
