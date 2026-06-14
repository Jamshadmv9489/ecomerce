import Button from "../common/Button";

const DataTable = ({ columns, data, onEdit, onDelete }) => {
    // Return placeholder if no data is present
    if (!data || data.length === 0) {
        return <div className="p-6 text-center text-gray-500 border rounded-lg">No data available.</div>;
    }

    return (
        <div className="w-full overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="w-full bg-white text-left text-sm border-collapse">
                {/* Header visible only on medium screens and up */}
                <thead className="bg-gray-50 border-b hidden md:table-header-group">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider">
                                {col.header}
                            </th>
                        ))}
                        <th className="py-4 px-6 text-center font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {data.map((row) => (
                        <tr key={row._id} className="flex flex-col md:table-row hover:bg-gray-50 md:p-0 transition-all">
                            {columns.map((col) => (
                                <td key={col.header} className="py-3 px-6 md:py-4 flex justify-between md:table-cell items-center gap-4">
                                    {/* Mobile label visible only on small screens */}
                                    <span className="font-bold md:hidden text-gray-500 uppercase text-[11px]">{col.header}:</span>

                                    <div className="text-right md:text-left truncate max-w-[200px]">
                                        {col.accessor === 'image' ? (
                                            <img
                                                src={row?.image?.url || '/placeholder.png'}
                                                alt={row?.name}
                                                className="w-12 h-12 object-cover rounded-md border"
                                                onError={(e) => { e.target.src = '/placeholder.png' }}
                                            />
                                        ) : (
                                            <span className="text-gray-800 font-medium">{row[col.accessor]}</span>
                                        )}
                                    </div>
                                </td>
                            ))}

                            {/* Action buttons cell */}
                            <td className="py-3 px-6 flex justify-end md:justify-center gap-2 border-t md:border-none">
                                <Button
                                    className="px-3 py-1 text-xs w-auto bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    onClick={() => onEdit(row.slug)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className="px-3 py-1 text-xs w-auto bg-red-600 hover:bg-red-700 cursor-pointer"
                                    onClick={() => onDelete(row.slug)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;