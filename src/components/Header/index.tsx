import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { MdOutlineCoronavirus } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import SearchBar from './SearchBar';
import CountriesList from './CountriesList';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [openCountriesList, setOpenCountriesList] = useState(false);
  const { countriesData } = useData();
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
