import React from "react";

const DataPreviewTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-center italic">
        No Data to preview!
      </p>
    );
  }

  // Dynamically get column headers
  const headers = Object.keys(data[0]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-red-500 mb-4 text-center">
        Data Preview
      </h2>

      {/* Responsive container */}
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full bg-white text-sm text-gray-700">
          {/* Table Head */}
          <thead className="bg-red-500 text-white">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-red-50 transition-colors`}
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-6 py-3 whitespace-nowrap border-b border-gray-200 text-center"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPreviewTable;
