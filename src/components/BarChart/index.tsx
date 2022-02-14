import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, label, color }: any) => {
  const keys = Object.keys(data) as any;
  const values = Object.values(data) as any;

  const newKeys = keys.filter((_key: any, index: number) => index !== 0);

  const newFormatedKeys = newKeys.map((date: any) => {
    let dia, mes;
    const dateLength = date.length;
    const ano = `${date[dateLength - 2]}${date[dateLength - 1]}`;
    if (date[1] === '/') {
      mes = `0${date[0]}`;
      if (date[3] === '/') {
        dia = `0${date[2]}`;
      } else if (date[4] === '/') {
        dia = `${date[2]}${date[3]}`;
      }
    } else if (date[2] === '/') {
      mes = `${date[0]}${date[1]}`;
      if (date[4] === '/') {
        dia = `0${date[3]}`;
      } else if (date[5] === '/') {
        dia = `${date[3]}${date[4]}`;
      }
    }
    return `${dia}/${mes}/${ano}`;
  });

  const valuesWithNull = values.map((value: any, index: number) => {
    if (index !== 0) {
      if (value - values[index - 1] >= 0) {
        return value - values[index - 1];
      } else {
        return 0;
      }
    }
    return null;
  });
  const newValues = valuesWithNull.filter((_value: any, index: number) => index !== 0);

  return (
    <Bar
      data={{
        labels: newFormatedKeys,
        datasets: [
          {
            label: label,
            data: newValues,
            barThickness: 17,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: color,
            hoverBackgroundColor: color,
          },
        ],
      }}
      options={{
        plugins: {
          title: {
            display: true,
            font: {
              size: 35,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              borderColor: 'white'
            },
          },
          y: {
            position: 'right',
            ticks: {
              maxTicksLimit: 6,
            },
            grid: {
              display: false,
              borderColor: 'white',
            },
          },
        },
      }}
    />
  );
}
export default BarChart;
