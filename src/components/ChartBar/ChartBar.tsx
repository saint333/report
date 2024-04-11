import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
  ChartData,
  ChartDataset,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useStateReportProvider } from "../../context/StateReportProvider";
import {
  listMonths,
  months,
  transformData,
} from "../../context/StateReportReducer";
import { useEffect, useState } from "react";

const colors = ["#7b9ca1", "#90b6bb", "#a1cbd1", "#b4dadf", "#bfbfbf"];

export default function ChartBar() {
  const { report } = useStateReportProvider();
  const [data, setData] = useState<
    ChartData<"bar", Array<number | null>, string>
  >({
    labels: listMonths,
    datasets: [],
  });

  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  useEffect(() => {
    if (report.data?.listPerProjectType?.length) {
      const label = [
        ...new Set(
          report.data.listPerProjectType.map(
            (label) => months.filter((month) => month.value == label.mes)[0].mes
          )
        ),
      ];
      const dataClear = transformData(report.data?.listPerProjectType, label);
      const dataEnd: ChartDataset<"bar", Array<number | null>>[] =
        dataClear.map((data, index) => {
          return {
            data: data.data,
            backgroundColor: colors[index],
          };
        });

      setData({
        labels: label,
        datasets: dataEnd,
      });
    }
  }, [report]);

  return (
    <div className='sm:w-4/6 m-auto'>
      <Bar options={options} data={data} />
    </div>
  );
}
