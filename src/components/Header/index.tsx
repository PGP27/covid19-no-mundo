import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { MdOutlineCoronavirus } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';
import { GrSearchAdvanced } from 'react-icons/gr';
import SearchBar from './SearchBar';
import CountriesList from './CountriesList';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [openCountriesList, setOpenCountriesList] = useState(false);
  const { countriesData } = useData();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleChangeCountriesListWidth = () => {
      const searchBarDivElement = document.querySelector('.search-bar-div') as any;
      const countriesListElement = document.querySelector('.countries-list') as any;
      if (searchBarDivElement && countriesListElement) {
        countriesListElement.style.width = `${searchBarDivElement.offsetWidth}px`;
      }
    }
    handleChangeCountriesListWidth();
    window.addEventListener('resize', handleChangeCountriesListWidth);
    return () => window.removeEventListener('resize', handleChangeCountriesListWidth);
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = ({ target }: any) => {
      if (openCountriesList && ref.current && !ref.current.contains(target)) {
        setOpenCountriesList(false);
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => document.removeEventListener('mousedown', checkIfClickedOutside);
  }, [openCountriesList]);

  return (
    <header className="flex flex-row items-center justify-center md:items-start font-default pt-2">
      <Link to="/" className="hidden mt-1 ml-4 md:block">
        <div className="flex flex-row items-center justify-center group">
          <MdOutlineCoronavirus fontSize={24} className="group-hover:text-gray-600"/>
          <h1 className={`text-xl ml-2 group-hover:text-gray-600`}>Covid-19 no mundo</h1>
        </div>
      </Link>
      <div className="search-bar-div flex-1 mx-4" ref={ref}>
        <SearchBar
          searchText={ searchText }
          onChange={({ target: { value } }: any) => {
            setSearchText(value);
            setOpenCountriesList(true);
          }}
          onFocus={() => {
            if (searchText !== '') setOpenCountriesList(true);
          }}
        />
        {openCountriesList && (
          <CountriesList
            countries={countriesData}
            searchText={searchText}
            onClick={() => setOpenCountriesList(false)}
          />
        )}
      </div>
      <button
        type="button"
        className="flex flex-row items-center justify-center mr-2 p-2 rounded-full hover:bg-gray-200 md:hidden"
        onClick={() => {
          const menu = document.querySelector('.mobile-menu');
          menu?.classList.toggle('-translate-x-full');
        }}
      >
        <FiMenu fontSize={24} className="group-hover:text-gray-600"/>
      </button>
      <div className="mobile-menu absolute w-full flex flex-col bg-gray-100 border border-black z-10 top-[58px] left-0 transform -translate-x-full transition duration-300 ease-in-out md:hidden">
        <button type="button" className="flex items-center p-3 hover:bg-blue-100" onClick={() => {
          const menu = document.querySelector('.mobile-menu');
          menu?.classList.toggle('-translate-x-full');
          navigate('/');
        }}>
          <FaHome fontSize={20} />
          <p className="ml-3">Home</p>
        </button>
        <button type="button" className="flex items-center p-3 hover:bg-blue-100" onClick={() => {
          const menu = document.querySelector('.mobile-menu');
          menu?.classList.toggle('-translate-x-full');
          navigate('/about');
        }}>
          <AiOutlineInfoCircle fontSize={20} />
          <p className="ml-3">Sobre</p>
        </button>
        <button type="button" className="flex items-center p-3 hover:bg-blue-100"  onClick={() => {
          const menu = document.querySelector('.mobile-menu');
          menu?.classList.toggle('-translate-x-full');
          navigate('/advancedSearch');
        }}>
          <GrSearchAdvanced fontSize={20} />
          <p className="ml-3">Busca avançada</p>
        </button>
      </div>
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
