import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Loading from '../components/Loading';
import WorldMap from 'react-svg-worldmap';
import PieChart from '../components/PieChart/PieChart';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const navigate = useNavigate();
  const { loading, globalData, globalVaccineData, continentsData, countriesData, countriesVaccineData } = useData();
  const [selectedLocation, setSelectedLocation] = useState('World');
  const [selectedLocationData, setSelectedLocationData] = useState<any>({});
  const [worldMapData, setWorldMapData] = useState<any>([]);
  
  const getLocationData = () => {
    if (selectedLocation === 'World') {
      setSelectedLocationData({
        ...globalData,
        vaccineCoverage: Object.values(globalVaccineData)[Object.values(globalVaccineData).length - 1],
      });
    } else {
      let count = 0;
      const filter = countriesVaccineData.filter((coun: any) => continentsData.find((cont) => cont.continent === selectedLocation)?.countries.includes(coun.country));
      if (filter && filter[0]) {
        interface CProps {
          country: string,
          timeline: number[],
        };
        filter.forEach((c: CProps) => {
          count += Object.values(c.timeline)[Object.values(c.timeline).length - 1]
        });
      }
      setSelectedLocationData({
        ...continentsData.find((c) => c.continent === selectedLocation),
        vaccineCoverage: count,
      });
    }
  };

  const buildWorldMap = () => {
    if (selectedLocation === 'World') {
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
    if (name) {
      navigate(`/${name}`);
    }
  };
  
  const prevLocation = () => {
    const currentLocationObj = continentsData.find((c) => c.continent === selectedLocation);
    if (currentLocationObj) {
      const index = continentsData.indexOf(currentLocationObj);
      if (index === 0) {
        setSelectedLocation('World');
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
        setSelectedLocation('World');
      } else {
        setSelectedLocation(continentsData[index + 1].continent);
      }
    } else {
      setSelectedLocation(continentsData[0].continent);
    }
  };

  useEffect(() => {
    buildWorldMap();
    getLocationData();
  }, [selectedLocation, globalData, globalVaccineData, continentsData, countriesData, countriesVaccineData]);

  if (loading) {
    return  <Loading />;
  }

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="flex items-center justify-center">
        <button type="button" className="p-1 rounded-full hover:bg-gray-200" onClick={prevLocation}>
          <HiOutlineChevronLeft fontSize={24} />
        </button>
        <p className="w-48 py-8 text-center text-xl">{selectedLocation}</p>
        <button type="button" className="p-1 rounded-full hover:bg-gray-200" onClick={nextLocation}>
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
            backgroundColor="#DDEEFF"
            tooltipBgColor="white"
            tooltipTextColor="black"
          />
        </div>
        <div className="text-lg sm:text-2xl mt-4 sm:mt-8 xl:ml-20">
          <p className="text-center">{Intl.NumberFormat().format(selectedLocationData.cases)} Casos confirmados</p>
          <div className="my-8">
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
                  'Infectados',
                  'Mortos'
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
