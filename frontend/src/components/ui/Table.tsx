interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export default function Table<T extends Record<string, any>>({ data, columns }: TableProps<T>) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.accessor as string}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor as string} className="px-6 py-4 whitespace-nowrap">
                {row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

