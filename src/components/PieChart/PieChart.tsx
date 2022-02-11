import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }: any) => (
  <Pie
    data={data}
    options={{
      plugins: {
        legend: {
          display: true,
        },
      },
    }}
  />
);

export default PieChart;
