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
      setYear(undefined)
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
      {!report.data?.listPerProjectType.length && (
        <div
          role='alert'
          className='relative flex sm:w-5/6 m-auto mt-3 px-4 py-4 text-base text-white bg-orange-500 rounded-lg font-regular'
          data-dismissible='alert'
        >
          <div className='mr-12 '>No hay datos para mostrar.</div>
          <button
            data-dismissible-target='alert'
            className='!absolute  top-3 right-3 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            type='button'
          >
            <span className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-6 h-6'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
