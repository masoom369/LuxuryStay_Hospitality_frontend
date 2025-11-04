import { Eye, Edit, Trash } from "lucide-react";
import Pagination from "./Pagination";

const DataTable = ({
  columns,
  data,
  actions,
  loading,
  error,
  emptyMessage = "No data found.",
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  return (
    <div>
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-accent text-white">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-3 text-left font-primary">
                {col.label}
              </th>
            ))}
            <th className="p-3 text-center font-primary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500 font-secondary">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4 text-red-500 font-secondary">
                {error}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item._id || index} className="border-b">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3 font-secondary">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                <td className="p-3 text-center flex justify-center gap-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(item)}
                      className={`hover:underline ${action.className || ""}`}
                    >
                      {action.icon}
                    </button>
                  ))}
                </td>
              </tr>
            ))
          )}
          {data.length === 0 && !loading && !error && (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500 font-secondary">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default DataTable;
