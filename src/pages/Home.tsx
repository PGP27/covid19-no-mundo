import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Loading from '../components/Loading';
import WorldMap from 'react-svg-worldmap';
import PieChart from '../components/PieChart/PieChart';
import BarChart from '../components/BarChart';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
  const navigate = useNavigate();
  const { loading, globalData, globalHistoric, continentsData, countriesData } = useData();
  const [selectedLocation, setSelectedLocation] = useState('Global');
  const [selectedLocationData, setSelectedLocationData] = useState<any>({});
  const [worldMapData, setWorldMapData] = useState<any>([]);
  
  const getLocationData = () => {
    if (selectedLocation === 'Global') {
      setSelectedLocationData(globalData);
    } else {
      setSelectedLocationData(continentsData.find((c) => c.continent === selectedLocation));
    }
  };

  const buildWorldMap = () => {
    if (selectedLocation === 'Global') {
      const data = countriesData.map((c) => {
        if (typeof c.countryInfo.iso2 === 'string' && typeof c.cases === 'number') {
          return {
            country: c.countryInfo.iso2,
            value: c.cases,
          }
        }
        return null;
      });
      setWorldMapData(data.filter((d) => d));
    } else {
      const data = countriesData.map((c) => {
        if (c.continent === selectedLocation && typeof c.countryInfo.iso2 === 'string' && typeof c.cases === 'number') {
          return {
            country: c.countryInfo.iso2,
            value: c.cases,
          }
        }
        return null;
      });
      setWorldMapData(data.filter((d) => d));
    }
  };

  const onClickCountry = (e: any) => {
    const name = countriesData.find((c) => c.countryInfo.iso2 === e.countryCode)?.country;
    if (name && e.countryValue) {
      navigate(`/country/${name}`);
    }
  };
  
  const prevLocation = () => {
    const currentLocationObj = continentsData.find((c) => c.continent === selectedLocation);
    if (currentLocationObj) {
      const index = continentsData.indexOf(currentLocationObj);
      if (index === 0) {
        setSelectedLocation('Global');
      } else {
        setSelectedLocation(continentsData[index - 1].continent);
      }
    } else {
      setSelectedLocation(continentsData[continentsData.length - 1].continent);
    }
  };

  const nextLocation = () => {
    const currentLocationObj = continentsData.find((c) => c.continent === selectedLocation);
    if (currentLocationObj) {
      const index = continentsData.indexOf(currentLocationObj);
      if (index === continentsData.length - 1) {
        setSelectedLocation('Global');
      } else {
        setSelectedLocation(continentsData[index + 1].continent);
      }
    } else {
      setSelectedLocation(continentsData[0].continent);
    }
  };

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
    buildWorldMap();
    getLocationData();
  }, [selectedLocation, globalData, continentsData, countriesData]);

  if (loading) {
    return  <Loading />;
  }

  if (globalHistoric.cases) {
    return (
      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center justify-center">
          <button aria-label="Prev location" type="button" className="p-1 rounded-full hover:bg-gray-200" onClick={prevLocation}>
            <HiOutlineChevronLeft fontSize={24} />
          </button>
          <p className="w-48 py-8 text-center text-xl">{selectedLocation}</p>
          <button aria-label="Next location" type="button" className="p-1 rounded-full hover:bg-gray-200" onClick={nextLocation}>
            <HiOutlineChevronRight fontSize={24} />
          </button>
        </div>
        <div className="w-full flex flex-col xl:flex-row items-center justify-center">
          <div className="hidden sm:block">
            <WorldMap
              color="#AAAA00"
              size="responsive"
              data={worldMapData}
              valueSuffix="Casos"
              onClickFunction={onClickCountry}
              tooltipBgColor="white"
              tooltipTextColor="black"
            />
          </div>
          <div className="w-80 flex flex-col items-center text-lg sm:text-xl mt-4 sm:mt-10 lg:mt-0 xl:ml-20">
            <p className="text-center">{Intl.NumberFormat().format(selectedLocationData.cases)} Casos confirmados</p>
            <div className="w-64 my-8">
              <PieChart
                data={{
                  datasets: [{
                    data: [selectedLocationData.recovered, selectedLocationData.active, selectedLocationData.deaths],
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
                    'Ativos',
                    'Mortos'
                  ],
                }}
              />
            </div>
          </div>
        </div>
        <div className="border-t pt-10 xl:hidden">
          <p className="text-2xl">Histórico global:</p>
          <p className="text-base">(últimos 29 dias)*</p>
          <div className="flex flex-col sm:flex-row mt-10 sm:mb-10">
            <p className="text-xl p-4 sm:px-10">{Intl.NumberFormat().format(getObjValuesDif(globalHistoric.cases))} Novos casos*</p>
            <p className="text-xl p-4 sm:px-10">{Intl.NumberFormat().format(getObjValuesDif(globalHistoric.deaths))} Mortos*</p>
          </div>
        </div>
        <div className="hidden my-10 px-10 xl:flex flex-col justify-center border-t">
          <p className="mt-20 text-2xl">Histórico global:</p>
          <p className="text-base">(últimos 29 dias)*</p>
          <div className="flex items-center justify-between">
            <div className="p-8">
              <p className="text-4xl">{Intl.NumberFormat().format(getObjValuesDif(globalHistoric.cases))}</p>
              <p className="text-xl">Novos casos*</p>
            </div>
            <div className="w-[900px]">
              <BarChart
                data={globalHistoric.cases}
                label="Casos"
                color="rgb(200, 150, 50)"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-10">
            <div className="p-8">
              <p className="text-4xl">{Intl.NumberFormat().format(getObjValuesDif(globalHistoric.deaths))}</p>
              <p className="text-xl">Mortos*</p>
            </div>
            <div className="w-[900px]">
              <BarChart
                data={globalHistoric.deaths}
                label="Mortes"
                color="rgb(200, 100, 100)"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default Home;
