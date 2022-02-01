const Loading = () => (
  <div className="flex-1 flex flex-col items-center justify-center">
    <div className="h-32 w-32 flex items-center justify-center rounded-full border-t border-b border-sky-600 animate-spin md:h-40 md:w-40" />
    <span className="absolute md:text-xl">Carregando...</span>
  </div>
);

export default Loading;
