import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const { country } = useParams();
  console.log(country);
  return (
    <div>CountryDetails</div>
  );
};

export default CountryDetails;