import { Link } from 'react-router-dom';

const CountriesList = ({ countries, searchText, onClick }: any) => {
  const searchBarDivElement = document.querySelector('.search-bar-div') as any;
  const filteredCountries = countries.filter(({ country }: any) => country.toLowerCase().includes(searchText.toLowerCase()));

  if (searchBarDivElement && searchText !== '') {
    if (filteredCountries.length > 0) {
      return (
        <div
          style={ { width: `${searchBarDivElement.offsetWidth}px`, border: '1px solid gray' } }
          className="countries-list absolute mt-2 max-h-60 overflow-auto bg-white z-10"
        >
          <ul className="">
            { filteredCountries.map(( { country, countryInfo: { flag } }: any) => {
              return (
                <Link key={country} onClick={ onClick } to={`/${country}`}>
                  <li className="flex items-center p-2 hover:bg-blue-100">
                    <img
                      src={ flag }
                      alt={`${country}'s flag`}
                      className="w-14 border border-gray-500"
                    />
                    <h3 className="p-2 text-lg">{ country }</h3>
                  </li>
                </Link>
              );
            }) }
          </ul>
        </div>
      );
    }
    return (
      <div
        style={ { width: `${searchBarDivElement.offsetWidth}px`, border: '1px solid gray' } }
        className="absolute mt-2 max-h-60 overflow-auto bg-white z-10"
      >
        <ul>
          <li className="flex items-center p-2">
            <h3 className="text-lg">País não encontrado</h3>
          </li>
        </ul>
      </div>
    );
  }
  return null;
};

export default CountriesList;
