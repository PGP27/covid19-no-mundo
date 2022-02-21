import { VscWarning } from 'react-icons/vsc';

const NotFound = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center sm:text-xl">
    <VscWarning fontSize={40} />
    <p className="text-xl">Página não encontrada.</p>
  </div>
);

export default NotFound;