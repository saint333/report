import { useEffect, useState } from "react";
import { ReducerCasesReport, listMonths } from "../context/StateReportReducer";
import { useStateReportProvider } from "../context/StateReportProvider";

interface ApiResponse {
  loading: boolean;
  error: Error | null;
}

export interface ProjectData {
  mes: string;
  project_Type: string;
  time_Distribution: number;
}

export interface ReportData {
  listPerProjectType: ProjectData[];
  oResponse: {
    responseCode: number;
    responseMessage: string;
  };
}

export function useServiceApi(): ApiResponse {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const {
    report: { month, year },
    dispatchReport,
  } = useStateReportProvider();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const indexMonth = month ? "&mes=" + (listMonths.indexOf(month) + 1) : "";
      const url = `https://apireports.azurewebsites.net/api/Reports?anio=${year}${indexMonth}`;
      try {
        const response = await fetch(url);
        const report: ReportData = await response.json();
        dispatchReport({
          type: ReducerCasesReport.DATA,
          value: { month, year, data: report },
        });
      } catch (fail) {
        setError(new Error("Failed to fetch data from the API"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [month, year, dispatchReport]);
  return { loading, error };
}
