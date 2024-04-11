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
export type YEARS = 2023 | 2024;

export enum ReducerCasesReport {
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export type State = {
  month: MONTHS;
  year: YEARS;
};

export const initialState: State = {
  month: "January",
  year: 2023,
};

export type Action = {
  type: ReducerCasesReport;
  value: State;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ReducerCasesReport.MONTH:
      return { ...state, month: action.value.month };
    case ReducerCasesReport.YEAR:
      return { ...state, year: action.value.year };
    default:
      return state;
  }
};

export default reducer;
