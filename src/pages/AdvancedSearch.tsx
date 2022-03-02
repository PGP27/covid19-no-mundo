import { useState } from 'react';
import { Form } from '@unform/web';
import { useData } from '../context/DataContext';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { populationAndTests, cases, recovered, active, deaths, today } from '../data';
import InputForm from '../components/InputForm';
import SelectForm from '../components/SelectForm';
import Report from '../components/Report';

const AdvancedSearch = () => {
  const { continentsData, countriesData } = useData();
  const [reportData, setReportData] = useState<any>();
  
  const submitForm = (data: any) => {
    const filtersKeys = Object.keys(data) as any;
    const filtersValues = Object.values(data) as any;
    let filteredCountries = countriesData;
    filtersKeys.forEach((fk: any, index: number) => {
      if (filtersValues[index] && filtersValues[index] !== 'Qualquer') {
        if (fk === 'country') {
          filteredCountries = filteredCountries.filter((c: any) => c[`${fk}`].toLowerCase().includes(filtersValues[index]));
        } else if (fk === 'continent') {
          filteredCountries = filteredCountries.filter((c: any) => c[`${fk}`] === filtersValues[index]);
        } else {
          filteredCountries = filteredCountries.filter((c: any) => {
            if (filtersValues[index].includes('+')) {
              return c[`${fk}`] > parseInt(filtersValues[index].replace('+', '').replaceAll('.', ''));
            }
            const ind = filtersValues[index].indexOf('-');
            const first = filtersValues[index].substring(0, ind);
            const last = filtersValues[index].substring(ind + 1, filtersValues[index].length);
            return c[`${fk}`] >= parseInt(first.replaceAll('.', '')) && c[`${fk}`] <= parseInt(last.replaceAll('.', ''));
          });
        }
      }
    });
    setReportData(filteredCountries);
  };

  return (
    <div className="flex-1 flex flex-col items-center py-10 sm:px-10 ">
      <Form onSubmit={submitForm} className="w-full flex flex-col">
        <h2 className="mx-4 sm:mx-0 mb-4 text-xl">Pesquisa de países:</h2>
        <p className="mx-4 sm:mx-0 mb-12">Utilize os filtros abaixo para gerar uma lista de países que atendem sua pesquisa.</p>
        <div className="self-center w-4/5 sm:w-full grid justify-items-center sm:justify-items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
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
          <div className="w-full flex items-end justify-between">
            <button className="flex items-center rounded-md py-1 px-5 bg-sky-800 text-white font-bold hover:opacity-90 hover:shadow-md" type="submit">
              <BsSearch fontSize={16} className="mr-2" />
              <span>Buscar</span>
            </button>
            <button className="flex items-center rounded-md py-1 px-5 bg-yellow-600 text-white font-bold hover:opacity-90 hover:shadow-md" type="reset">
              <AiOutlineClose fontSize={16} className="mr-2" />
              <span>Limpar</span>
            </button>
          </div>
        </div>
      </Form>
      {reportData && <Report data={reportData} />}
    </div>
  );
};

export default AdvancedSearch;
