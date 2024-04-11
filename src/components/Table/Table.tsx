import { useStateReportProvider } from "../../context/StateReportProvider";
import { months, transformData } from "../../context/StateReportReducer";

export default function Table() {
  const { report } = useStateReportProvider();
  const title = [
    ...new Set(
      report?.data?.listPerProjectType.map(
        (label) => months.filter((month) => month.value == label.mes)[0].mes
      )
    ),
  ];
  const dataClear = transformData(
    report?.data?.listPerProjectType || [],
    title
  );

  return (
    <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border sm:w-5/6 m-auto my-12'>
      <table className='w-full text-left table-auto min-w-max'>
        <thead>
          <tr>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'></p>
            </th>
            {title.map((item) => {
              return (
                <th
                  key={item}
                  className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'
                >
                  <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                    {item}
                  </p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataClear.map((item) => {
            return (
              <tr key={item.label}>
                <td className='p-4 border-b border-blue-gray-50'>
                  <p className='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                    {item.label}
                  </p>
                </td>
                {item.data.map((value, index) => {
                  return (
                    <td
                      key={value || index}
                      className='p-4 border-b border-blue-gray-50'
                    >
                      <p className='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                        {value || "--"}
                      </p>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
