import { useContext } from "react";
import { StateReportContext } from "./StateReportContext";

export const useStateReportProvider = () => {
  const context = useContext(StateReportContext);
  if (!context) {
    throw new Error("useStateProvider must be used within a StateProvider");
  }
  return context;
};