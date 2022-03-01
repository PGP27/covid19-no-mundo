import { useNavigate } from "react-router-dom";

const Report = ({ data }: any) => {
  const navigate = useNavigate();
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
        </tr>
      </thead>
      <tbody>
        {data.map((d: any) => {
          return (
            <tr
              onClick={() => navigate(`/country/${d.country}`)}
              className="w-full bg-slate-50 odd:bg-slate-100 cursor-pointer hover:bg-sky-100"
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
              <td>{d.population}</td>
              <td>{d.cases}</td>
              <td>{d.recovered}</td>
              <td>{d.active}</td>
              <td>{d.deaths}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Report;
