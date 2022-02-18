import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Loading from '../components/Loading';
import PieChart from '../components/PieChart/PieChart';
import BarChart from '../components/BarChart';

const CountryDetails = () => {
  const { country } = useParams();
  const { countriesData } = useData();
  const [countryHistory, setCountryHistory] = useState<any>();
  const [countryVaccineHistory, setCountryVaccineHistory] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  
  const currentCountry = useMemo(() => {
    return countriesData.find((c) => c.country === country);
  }, [countriesData, country]);

  const getCountryHistorys = async () => {
    setLoading(true);
    const response1 = await fetch(`https://disease.sh/v3/covid-19/historical/${country}`);
    const obj1 = await response1.json();
    setCountryHistory(obj1);
    const response2 = await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}`);
    const obj2 = await response2.json();
    setCountryVaccineHistory(obj2);
    setLoading(false);
  }

  const getObjValuesDif = (obj: any) => {
    const values = Object.values(obj) as any;
    const valuesWithNull = values.map((value: any, index: number) => {
      if (index !== 0) {
        if (value - values[index - 1] >= 0) {
          return value - values[index - 1];
        } else {
          return 0;
        }
      }
      return null;
    });
    const newValues = valuesWithNull.filter((_value: any, index: number) => index !== 0);
    return newValues.reduce((acc: number, v: number) => acc + v);
  };


  useEffect(() => {
    getCountryHistorys();
  }, [country]);

  if (loading) {
    return <Loading />;
  }

  if (currentCountry && countryHistory && countryVaccineHistory) {
    return (
      <div className="flex-1 flex flex-col items-center mt-10">
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
        {(countryHistory.message || countryVaccineHistory.message) && (
          <p className="my-10 px-10 text-center text-xl">Esse país não possui dados históricos.</p>
        )}
        {(!countryHistory.message && !countryVaccineHistory.message) && (
          <div>
            <div className="border-t pt-10 xl:hidden">
              <p className="text-2xl">Histórico global:</p>
              <p className="text-base">(últimos 29 dias)*</p>
              <div className="flex flex-col md:flex-row mt-10 md:mb-10">
                <p className="text-xl p-4 md:px-10">{Intl.NumberFormat().format(getObjValuesDif(countryHistory.timeline.cases))} Novos casos*</p>
                <p className="text-xl p-4 md:px-10">{Intl.NumberFormat().format(getObjValuesDif(countryHistory.timeline.deaths))} Mortos*</p>
                <p className="text-xl p-4 md:px-10">{Intl.NumberFormat().format(getObjValuesDif(countryVaccineHistory.timeline))} Vacinas aplicadas*</p>
              </div>
            </div>
            <div className="hidden my-10 px-10 xl:flex flex-col justify-center border-t">
              <p className="mt-20 text-2xl">Histórico:</p>
              <p className="text-base">(últimos 29 dias)*</p>
              <div className="flex items-center justify-between">
                <div className="p-8">
                  <p className="text-4xl">{Intl.NumberFormat().format(getObjValuesDif(countryHistory.timeline.cases))}</p>
                  <p className="text-xl">Novos casos*</p>
                </div>
                <div className="w-[900px]">
                  <BarChart
                    data={countryHistory.timeline.cases}
                    label="Casos"
                    color="rgb(200, 150, 50)"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-10">
                <div className="p-8">
                  <p className="text-4xl">{Intl.NumberFormat().format(getObjValuesDif(countryHistory.timeline.deaths))}</p>
                  <p className="text-xl">Mortos*</p>
                </div>
                <div className="w-[900px]">
                  <BarChart
                    data={countryHistory.timeline.deaths}
                    label="Mortos"
                    color="rgb(200, 100, 100)"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-10">
                <div className="p-8">
                  <p className="text-4xl">{Intl.NumberFormat().format(getObjValuesDif(countryVaccineHistory.timeline))}</p>
                  <p className="text-xl">Vacinas aplicadas*</p>
                </div>
                <div className="w-[900px]">
                  <BarChart
                    data={countryVaccineHistory.timeline}
                    label="Vacinas aplicadas"
                    color="rgb(150, 200, 150)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default CountryDetails;