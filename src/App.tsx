import "./App.css";
import Filters from "./components/Filters/Filters";
import ChartBar from "./components/ChartBar/ChartBar";
import { useServiceApi } from "./hook/useServiceApi";
import Table from "./components/Table/Table";

function App() {
  useServiceApi()
  return (
    <>
      <header className="bg-gray-300 py-6 px-4 text-lg underline">
        Reporte Manning Distribution (%) per Project
      </header>
      <Filters />
      <ChartBar />
      <Table/>
    </>
  );
}

export default App;
