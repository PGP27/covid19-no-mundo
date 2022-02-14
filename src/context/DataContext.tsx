import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface DataContextProps {
  loading: boolean,
  globalData: GlobalDataProps,
  globalHistoric: GlobalHistoricProps,
  continentsData: ContinentsDataProps[],
  countriesData: CountriesDataProps[],
  countriesVaccineData: any,
};

interface GlobalDataProps {
  updated: number,
  cases: number,
  todayCases: number,
  deaths: number,
  todayDeaths: number,
  recovered: number,
  todayRecovered: number,
  active: number,
  critical: number,
  casesPerOneMillion: number,
  deathsPerOneMillion: number,
  tests: number,
  testsPerOneMillion: number,
  population: number,
  oneCasePerPeople: number,
  oneDeathPerPeople: number,
  oneTestPerPeople: number,
  activePerOneMillion: number,
  recoveredPerOneMillion: number,
  criticalPerOneMillion: number,
  affectedCountries: number,
};

interface GlobalHistoricProps {
  cases: any,
  deaths: any,
  recovered: any,
};

interface ContinentsDataProps extends Omit<GlobalDataProps, 'affectedCountries' | 'oneCasePerPeople' | 'oneDeathPerPeople' | 'oneTestPerPeople'> {
  continent: string,
  continentInfo: {
    lat: number,
    long: number,
  },
  countries: string[],
};

interface CountriesDataProps extends Omit<GlobalDataProps, 'affectedCountries'> {
  continent: string,
  country: string,
  countryInfo: {
    _id: number,
    iso2: string,
    iso3: string,
    lat: number,
    long: number,
    flag: string,
  },
};

interface DataProviderProps {
  children: ReactNode,
};

const fetchAPI = async (url: string) => {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
};

const DataContext = createContext({} as DataContextProps);

const DataProvider = ({ children }: DataProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [globalData, setGlobalData] = useState<GlobalDataProps>({} as GlobalDataProps);
  const [globalHistoric, setGlobalHistoric] = useState<GlobalHistoricProps>({} as GlobalHistoricProps);
  const [continentsData, setContinentsData] = useState<Array<ContinentsDataProps>>([] as ContinentsDataProps[]);
  const [countriesData, setCountriesData] = useState<Array<CountriesDataProps>>([] as CountriesDataProps[]);
  const [countriesVaccineData, setCountriesVaccineData] = useState<any>([]);

  const getDatas = async () => {
    setLoading(true);
    const global = await fetchAPI('https://disease.sh/v3/covid-19/all');
    const globalHist = await fetchAPI('https://disease.sh/v3/covid-19/historical/all');
    const continents = await fetchAPI('https://disease.sh/v3/covid-19/continents');
    const countries = await fetchAPI('https://disease.sh/v3/covid-19/countries');
    const countriesVaccine = await fetchAPI('https://disease.sh/v3/covid-19/vaccine/coverage/countries');
    setGlobalData(global);
    setGlobalHistoric(globalHist);
    setContinentsData(continents);
    setCountriesData(countries);
    setCountriesVaccineData(countriesVaccine);
    setLoading(false);
  };
  
  useEffect(() => {
    getDatas();
  }, []);

  return(
    <DataContext.Provider value={{ loading, globalData, globalHistoric, continentsData, countriesData, countriesVaccineData }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  return context;
};

export {
  DataProvider,
  useData,
};
