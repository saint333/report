import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import reducer, {
  Action,
  initialState,
} from "./StateReportReducer";

type StateProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  report: typeof initialState;
  dispatchReport: Dispatch<Action>;
};

export const StateReportContext = createContext<ContextProps | undefined>(
  undefined
);

export const StateReportProvider: React.FC<StateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateReportContext.Provider
      value={{ report: state, dispatchReport: dispatch }}
    >
      {children}
    </StateReportContext.Provider>
  );
};
