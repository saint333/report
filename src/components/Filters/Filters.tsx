import { FaRegCalendarAlt } from "react-icons/fa";
import {
  MONTHS,
  ReducerCasesReport,
  YEARS,
  listMonths,
} from "../../context/StateReportReducer";
import { FormEventHandler, useState } from "react";
import { useStateReportProvider } from "../../context/StateReportProvider";

export default function Filters() {
  const { report, dispatchReport } = useStateReportProvider();
  const [month, setMonth] = useState<MONTHS>();
  const [year, setYear] = useState<YEARS>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (month) {
      dispatchReport({
        type: ReducerCasesReport.MONTH,
        value: { year: report.year, month, data: null },
      });
    }
    if (year) {
      dispatchReport({
        type: ReducerCasesReport.YEAR,
        value: { month: report.month, year, data: null },
      });
    }
  };

  return (
    <div className='p-4 border-blue-300 border-2'>
      <form
        className='flex gap-4 sm:w-5/6 m-auto flex-wrap items-end'
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor='month'>Month</label>
          <div className='flex items-center'>
            <button
              type='button'
              data-ripple-light='true'
              className='bg-light-blue-50 p-[8.7px] rounded-s border-e-0 border-2 border-gray-400 text-lg'
            >
              <FaRegCalendarAlt />
            </button>
            <select
              name='month'
              id='month'
              className='p-2 border-2 border-gray-400 rounded-e outline-none'
              defaultValue=''
              onChange={(e) => setMonth(e.currentTarget.value as MONTHS)}
            >
              <option disabled value=''>
                --select--
              </option>
              {listMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='year'>Year</label>
          <div className='flex items-center'>
            <button
              type='button'
              data-ripple-light='true'
              className='bg-light-blue-50 p-[8.7px] rounded-s border-e-0 border-2 border-gray-400 text-lg'
            >
              <FaRegCalendarAlt />
            </button>
            <select
              name='year'
              id='year'
              className='p-2 border-2 border-gray-400 rounded-e outline-none'
              defaultValue=''
              onChange={(e) => setYear(Number(e.currentTarget.value) as YEARS)}
            >
              <option disabled value=''>
                --select--
              </option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
            </select>
          </div>
        </div>
        <button
          type='submit'
          className='bg-[#007d84] py-2 px-3 text-white rounded-lg'
        >
          Search
        </button>
      </form>
    </div>
  );
}
