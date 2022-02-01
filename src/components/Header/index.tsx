import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCoronavirus } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import SearchBar from './SearchBar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex flex-row items-center justify-center md:items-start font-default mt-2">
      <Link to="/" className="hidden mt-1 ml-4 md:block">
        <div className="flex flex-row items-center justify-center group">
          <MdOutlineCoronavirus fontSize={24} className="group-hover:text-gray-600"/>
          <h1 className={`text-xl ml-2 group-hover:text-gray-600`}>Covid-19 no mundo</h1>
        </div>
      </Link>
      <SearchBar />
      <button
        type="button"
        className="flex flex-row items-center justify-center mr-2 p-2 rounded-full hover:bg-gray-200 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu fontSize={24} className="group-hover:text-gray-600"/>
      </button>
      <Link to="/about" className="hidden mt-1 mr-4 md:block">
        <div className="flex flex-row items-center justify-center group">
          <AiOutlineInfoCircle fontSize={24} className="group-hover:text-gray-600" />
          <h3 className={`text-xl ml-2 group-hover:text-gray-600`}>Sobre</h3>
        </div>
      </Link>
    </header>
  );
};

export default Header;
