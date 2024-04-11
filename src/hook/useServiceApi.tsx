import { useEffect, useState } from "react";
import { MONTHS, YEARS, listMonths } from "../context/StateReportReducer";

interface ApiResponse {
  data: ReportData | null;
  loading: boolean;
  error: Error | null;
  fetchData: (year: YEARS, month?: MONTHS) => Promise<void>;
}

interface ProjectData {
  mes: string;
  project_Type: string;
  time_Distribution: number;
}

interface ReportData {
  listPerProjectType: ProjectData[];
  oResponse: {
    responseCode: number;
    responseMessage: string;
  };
}

export function useServiceApi(): ApiResponse {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (year: number, month?: MONTHS) => {
    setLoading(true);
    const indexMonth = month
    ? "&mes=" + (listMonths.indexOf(month) + 1)
    : "";
    console.log("🚀 ~ fetchData ~ indexMonth:", indexMonth)
    const url = `https://apireports.azurewebsites.net/api/Reports?anio=${year}${indexMonth}`;
    try {
      const response = await fetch(url);
      const report = await response.json();
      setData(report);
    } catch (fail) {
      setError(new Error("Failed to fetch data from the API"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(new Date().getFullYear());
  }, []);
  return { data, loading, error, fetchData };
}
