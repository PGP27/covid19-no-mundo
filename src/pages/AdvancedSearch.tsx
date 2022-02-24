import { Form } from "@unform/web";
import { useData } from "../context/DataContext";
import { BsSearch } from 'react-icons/bs';
import { populationAndTests, cases, recovered, active, deaths, today } from '../data';
import InputForm from "../components/InputForm";
import SelectForm from "../components/SelectForm";

const AdvancedSearch = () => {
  const { continentsData, countriesData } = useData();
  
  const submitForm = (data: any) => {
    const filtersKeys = Object.keys(data);
    const filtersValues = Object.values(data);
    let filteredCountries = countriesData;
    filtersKeys.forEach((fk, index) => {
      if (filtersValues[index] && filtersValues[index] !== 'Qualquer') {
        if (fk === 'country') {
          filteredCountries = filteredCountries.filter((c: any) => c[`${fk}`].toLowerCase().includes(filtersValues[index]));
        } else if (fk === 'continent') {
          filteredCountries = filteredCountries.filter((c: any) => c[`${fk}`] === filtersValues[index]);
        } else {
          // filteredCountries = filteredCountries.filter((c: any) => c[`${fk}`] === filtersValues[index]);
        }
        console.log(filteredCountries);
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center">
      <Form onSubmit={submitForm} className="my-10 flex flex-col">
        <h2 className="mx-4 sm:mx-0 mb-6 text-xl">Pesquisa de países:</h2>
        <p className="mx-4 sm:mx-0 mb-16">Utilize os filtros abaixo para gerar uma lista de países que atendem sua pesquisa.</p>
        <div className="self-center w-4/5 sm:w-full grid justify-items-center sm:justify-items-start gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <InputForm name="country" label="País" placeholder="Nome do país" />
          <SelectForm name="continent" label="Continente" options={continentsData.map(({ continent }) => continent)} />
          <SelectForm name="population" label="População" options={populationAndTests} />
          <SelectForm name="cases" label="Casos" options={cases} />
          <SelectForm name="recovered" label="Recuperados" options={recovered} />
          <SelectForm name="active" label="Infectados" options={active} />
          <SelectForm name="deaths" label="Mortos" options={deaths} />
          <SelectForm name="tests" label="Testes" options={populationAndTests} />
          <SelectForm name="todayCases" label="Casos hoje" options={today} />
          <SelectForm name="todayRecovered" label="Recuperados hoje" options={today} />
          <SelectForm name="todayDeaths" label="Mortos hoje" options={today} />
          <button className="self-end flex items-center rounded-md py-1 px-6 bg-sky-800 text-white hover:opacity-90" type="submit">
            <span>Buscar</span>
            <BsSearch fontSize={16} className="ml-2" />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdvancedSearch;
