import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const searchBarDivStyles = 'group md:mx-4 py-1 px-2 rounded-md cursor-text bg-gray-100  hover:bg-gray-200 focus-within:shadow-[0px_0px_3px_1px_rgba(0,0,0,0.5)] focus-within:bg-white focus-within:hover:bg-white';
  const searchBarInputStyles = 'w-full flex-1 p-1 outline-none bg-gray-100 group-hover:bg-gray-200 focus-within:bg-white focus-within:group-hover:bg-white';

  return (
    <div className="flex-1 mx-2">
      <div  
        className={`searchBarElement flex flex-row items-center justify-center ${searchBarDivStyles}`}
        onClick={() => document.getElementById('searchBarInput')?.focus()}
      >
        <BsSearch className="searchBarElement mr-2" />
        <input
          id="searchBarInput"
          type="text"
          placeholder="Busque por um país..."
          className={`searchBarElement ${searchBarInputStyles}`}
          autoComplete="off"
        />
      </div>
      <p className="hidden mx-4 md:block">...ou experimente a <Link to="/advancedSearch" className="text-cyan-400 hover:underline">Busca Avançada</Link></p>
    </div>
  );
}

export default SearchBar;
