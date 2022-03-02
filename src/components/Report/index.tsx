import { BsEyeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Report = ({ data }: any) => {
  return (
    <table className="w-full table-fixed mt-10 text-center rounded-md bg-slate-200">
      <thead>
        <tr>
          <th className="p-2">#</th>
          <th className="p-2">País</th>
          <th className="p-2">Continente</th>
          <th className="p-2">População</th>
          <th className="p-2">Casos</th>
          <th className="p-2">Recuperados</th>
          <th className="p-2">Infectados</th>
          <th className="p-2">Mortos</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((d: any) => {
          return (
            <tr
              key={d.country}
              className="w-full bg-slate-50 odd:bg-slate-100"
            >
              <td className="flex items-center justify-center">
                <img
                  src={d.countryInfo.flag}
                  alt={`${d.country}'s flag`}
                  className="my-4 w-20 border border-gray-500"
                />
              </td>
              <td>{d.country}</td>
              <td>{d.continent}</td>
              <td>{Intl.NumberFormat().format(d.population)}</td>
              <td>{Intl.NumberFormat().format(d.cases)}</td>
              <td>{Intl.NumberFormat().format(d.recovered)}</td>
              <td>{Intl.NumberFormat().format(d.active)}</td>
              <td>{Intl.NumberFormat().format(d.deaths)}</td>
              <td>
                <Link to={`/country/${d.country}`}>
                  <button type="button" className="border border-slate-400 rounded-md bg-white hover:bg-green-100 p-2">
                    <BsEyeFill fontSize={20} />
                  </button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Report;
