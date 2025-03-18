export function LoadingScreen() {
  return (
    <div className="flex flex-row justify-center items-center w-dvw h-dvh gap-2">
      <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}
