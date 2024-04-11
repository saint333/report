import { ProjectData, ReportData } from "../hook/useServiceApi";

export const listMonths: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
export type MONTHS =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July";

export const months = [
  { value: "FEB", mes: "February" },
  { value: "MAR", mes: "March" },
  { value: "APR", mes: "April" },
];
export type YEARS = 2023 | 2024;

export enum ReducerCasesReport {
  MONTH = "MONTH",
  YEAR = "YEAR",
  DATA = "DATA",
}

export type State = {
  month: MONTHS | null;
  year: YEARS;
  data: ReportData | null;
};

export const initialState: State = {
  month: null,
  year: 2024,
  data: null,
};

export type Action = {
  type: ReducerCasesReport;
  value: State;
};

export function transformData(inputArray: ProjectData[], label: string[]) {
  const groupedData: { [key: string]: (number | null)[] } = {};
  inputArray.forEach((item) => {
    if (!groupedData[item.project_Type]) {
      groupedData[item.project_Type] = [null, null, null];
    }
    switch (item.mes) {
      case "FEB":
        groupedData[item.project_Type][0] = item.time_Distribution;
        break;
      case "MAR":
        groupedData[item.project_Type][1] = item.time_Distribution;
        break;
      case "APR":
        groupedData[item.project_Type][2] = item.time_Distribution;
        break;
      default:
        break;
    }
  });
  const transformedArray = [];
  for (const projectType in groupedData) {
    const data = label.length === 1 ? groupedData[projectType].filter(item => item !== null) : groupedData[projectType]
    transformedArray.push({
      data: data,
      label: projectType,
    });
  }
  
  return transformedArray;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ReducerCasesReport.MONTH:
      return { ...state, month: action.value.month, year: action.value.year };
    case ReducerCasesReport.YEAR:
      return { ...state, year: action.value.year, month: action.value.month };
    case ReducerCasesReport.DATA:
      return { ...state, data: action.value.data };
    default:
      return state;
  }
};

export default reducer;
