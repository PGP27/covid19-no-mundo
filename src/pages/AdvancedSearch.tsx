import { Form } from "@unform/web";
import { useMemo } from "react";
import InputForm from "../components/InputForm";
import SelectForm from "../components/SelectForm";
import { useData } from "../context/DataContext";

const AdvancedSearch = () => {
  const { continentsData } = useData();
  const cases = useMemo(() => {
    return [
      '0 - 1.000',
      '1.001 - 10.000',
      '10.001 - 100.000',
      '100.001 - 500.000',
      '500.001 - 1.000.000',
      '1.000.001 - 5.000.000',
      '5.000.001 - 10.000.000',
      '10.000.000+',
    ];
  }, []);
  
  const submitForm = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex-1 flex flex-col items-center">
      <Form onSubmit={submitForm}>
        <InputForm name="country" label="País" placeholder="Nome do país" />
        <SelectForm name="continent" label="Continente" options={continentsData.map(({ continent }) => continent)} />
        <SelectForm name="cases" label="Número de casos" options={cases} />
        <button type="submit">Buscar</button>
      </Form>
    </div>
  );
};

export default AdvancedSearch;
