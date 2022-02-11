import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import WorldMap from 'react-svg-worldmap';
import Loading from '../components/Loading';

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
    navigate(`/${name}`);
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
    <div className="flex flex-col items-center">
      <div className="flex">
        <button type="button" onClick={prevLocation}>
          <HiOutlineChevronLeft fontSize={24} />
        </button>
        <p>{selectedLocation}</p>
        <button type="button" onClick={nextLocation}>
          <HiOutlineChevronRight fontSize={24} />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <WorldMap
            color="#AAAA00"
            size="xl"
            data={worldMapData}
            valueSuffix="Contaminados"
            onClickFunction={onClickCountry}
            backgroundColor="#DDEEFF"
            tooltipBgColor="white"
            tooltipTextColor="black"
          />
        </div>
        <div>
          <p>{selectedLocationData.cases} casos confirmados</p>
          <div>
            <p>recuperados: {selectedLocationData.recovered}</p>
            <p>infectados: {selectedLocationData.active}</p>
            <p>mortos: {selectedLocationData.deaths}</p>
          </div>
          <p>{selectedLocationData.tests} teste aplicados</p>
          <p>{selectedLocationData.vaccineCoverage} doses de vacinas aplicadas</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
