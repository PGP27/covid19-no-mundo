import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
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

  useEffect(() => {
    buildWorldMap();
    getLocationData();
  }, [selectedLocation, globalData, globalVaccineData, continentsData, countriesData, countriesVaccineData]);

  if (loading) {
    return  <Loading />;
  }

  return (
    <div>
      <div></div>
      <div>
        <div>
          <WorldMap
            color="green"
            size="responsive"
            data={worldMapData}
            valueSuffix="Contaminados"
            onClickFunction={onClickCountry}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
