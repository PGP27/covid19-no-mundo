import { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import WorldMap from 'react-svg-worldmap';
import Loading from '../components/Loading';

const Home = () => {
  const { loading, globalData, continentsData, countriesData } = useData();
  const [selectedLocation, setSelectedLocation] = useState('World');
  const [worldMapData, setWorldMapData] = useState<any>([]);

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

  useEffect(() => {
    buildWorldMap();
  }, [selectedLocation, countriesData]);

  if (loading) {
    return  <Loading />;
  }

  return (
    <div>
      <WorldMap
        color="green"
        size="responsive"
        data={worldMapData}
        valueSuffix="Contaminados"
        onClickFunction={(e: any) => console.log(e)}
      />
    </div>
  );
};

export default Home;
