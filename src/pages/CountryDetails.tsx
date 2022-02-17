import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Loading from '../components/Loading';
import PieChart from '../components/PieChart/PieChart';

const CountryDetails = () => {
  const { country } = useParams();
  const { countriesData, countriesVaccineData } = useData();
  const currentCountry = useMemo(() => {
    return countriesData.find((c) => c.country === country);
  }, [countriesData, country]);

  if (currentCountry) {
    return (
      <div className="flex-1 mt-10">
        <div className="xl:flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <img
              src={currentCountry.countryInfo.flag}
              alt={`${currentCountry.country}'s flag`}
              className="border border-gray-500"
            />
            <div className="sm:flex">
              <div className="mt-10 sm:mr-10 md:mr-0 leading-10 md:text-lg md:mt-0 md:ml-20 md:leading-10 lg:ml-40 xl:ml-20">
                <p>País: {currentCountry.country}</p>
                <p>Continente: {currentCountry.continent}</p>
                <p>População: {Intl.NumberFormat().format(currentCountry.population)}</p>
              </div>
              <div className="mt-10 sm:ml-10 leading-10 md:hidden">
                <p>Casos hoje: {Intl.NumberFormat().format(currentCountry.todayCases)}</p>
                <p>Recuperados hoje: {Intl.NumberFormat().format(currentCountry.todayRecovered)}</p>
                <p>Mortos hoje: {Intl.NumberFormat().format(currentCountry.todayDeaths)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center mt-10 md:mt-20 xl:mt-0">
            <div className="w-80 flex flex-col items-center text-lg md:text-xl xl:ml-20">
              <p className="text-center">{Intl.NumberFormat().format(currentCountry.cases)} Casos confirmados</p>
              <div className="w-64 my-8">
                <PieChart
                  data={{
                    datasets: [{
                      data: [currentCountry.recovered, currentCountry.active, currentCountry.deaths],
                      backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                      ],
                      borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                      ],
                      borderWidth: 2,
                    }],
                    labels: [
                      'Recuperados',
                      'Infectados',
                      'Mortos'
                    ],
                  }}
                />
              </div>
            </div>
            <div className="hidden md:block text-lg leading-10 md:ml-20 lg:ml-40 xl:ml-20">
              <p>Casos hoje: {Intl.NumberFormat().format(currentCountry.todayCases)}</p>
              <p>Recuperados hoje: {Intl.NumberFormat().format(currentCountry.todayRecovered)}</p>
              <p>Mortos hoje: {Intl.NumberFormat().format(currentCountry.todayDeaths)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default CountryDetails;